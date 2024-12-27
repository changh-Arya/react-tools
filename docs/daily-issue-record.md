Root and sub-app

Root可以提供一个事件，触发的时候，sub-app去监听。 前提是提供事件的组件是一个web-component，这个component在子组件使用了。比如，ado-header，上面通过ref监听一个事件
eg：

1、root -》 app-ado-mobile-header-component

  @Output('enterGlobalSearch') enterGlobalSearch = new EventEmitter();
  // lister for global search
  private globalListener$: Subscription;
  constructor(
    private globalSearchService: HeaderGlobalSearchService,
  ) {

    // lister for global search，
    this.globalListener$ = this.globalSearchService.enterGlobalSearch.subscribe(() => {
      this.enterGlobalSearch.emit();
    });
  }

  ngOnDestroy(): void {
    this.globalListener$ && this.globalListener$.unsubscribe()
  }



2、share function 的service

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { debounceTime, throttle } from 'rxjs';
import { ENV } from 'src/environments/environment';

interface UnreadRes {
  data: any[];
  message: string;
  status: number;
}

@Injectable({ providedIn: 'root' })
export class HeaderGlobalSearchService {
  enterGlobalSearch: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {}
  
  triggerEnterGlobalSearch() {
    this.enterGlobalSearch.emit();
  }

  getData() {
    const url = `${ENV.apiPrefixUrl}/hk-ado-common-service/api/v1/search/histories?functionName=landing.products`;
    return this.http.get<UnreadRes>(url);
  }
  createData(searchContent:string) {
    const url = `${ENV.apiPrefixUrl}/hk-ado-common-service/api/v1/search/history`;
    return this.http.post<UnreadRes>(url,{functionName:'landing.products',searchContent:searchContent});
  }
  deleteData( id: string) {
    const url = `${ENV.apiPrefixUrl}/hk-ado-common-service/api/v1/search/history?idList=${id}`;
    return this.http.delete<UnreadRes>(url);
  }
}

3、trigger function
      this.cancelGlobalSearch.emit();

4、sub-app监听事件

  useEffect(() => {
    const enterGlobalSearch = () => {
      const defaultSearchVal = sessionStorage.getItem('global_search') as string
      setDefaultValue(defaultSearchVal)
      // trigger search mode
    }
    const headerRef = adoHeaderRef?.current
    headerRef?.addEventListener('enterGlobalSearch', enterGlobalSearch)
    return () => {
      if (headerRef) {
        headerRef.removeEventListener('enterGlobalSearch', enterGlobalSearch)
      }
    }
  }, [from])

  return (
    <ado-layout>
      <ado-mobile-header
        ref={adoHeaderRef}
        default-back-href={backUrl}
        enable-desktop-back="true"
      >
        {f(messages.title)}
      </ado-mobile-header>


这里有更好的解决方案，还是把参数放在路由上，为了能更好的navigate.back() , 在合适的时候改url的search参数的时候使用replace：true 即可

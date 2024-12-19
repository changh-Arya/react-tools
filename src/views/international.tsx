
import { FormattedDateParts, FormattedMessage } from 'react-intl'
import { messages } from '../../message'
import styles from '../../index.module.scss'

export function ReactIntl() {
  return (
    <div>
      <FormattedMessage
        id={messages.title.id}
        defaultMessage={messages.title.defaultMessage}
        values={{
          b: args => <b className={styles.titleTop}>{args}</b>,
          str: chunks => <strong className={styles.chunk}>{chunks}</strong>,
          value: '999',
          code: '000'
        }}
      />

      <br />
      <FormattedDateParts
        value={new Date(1459832991883)}
        year="numeric"
        month="long"
        day="2-digit"
      >
        {parts => (
          <>
            <b>{parts[0].value}</b>
            {parts[1].value}
            <small>{parts[2].value}</small>
          </>
        )}
      </FormattedDateParts>
    </div>
  )
}

// import Slider from 'react-slick';
// import './index.scss';

// const products = [
//   { name: '产品 A', features: ['特性 1', '特性 2', '特性 3'], performance: '高', price: '￥1000' },
//   { name: '产品 B', features: ['特性 A', '特性 B', '特性 C'], performance: '中', price: '￥1500' },
//   { name: '产品 C', features: ['特性 X', '特性 Y', '特性 Z'], performance: '低', price: '￥800' },
//   { name: '产品 D', features: ['特性 4', '特性 5', '特性 6'], performance: '高', price: '￥2000' },
// ];

// const Compare = () => {
//   const settings = {
//     infinite: false, // 不无限循环
//     speed: 500, // 动画过渡时间
//     slidesToShow: 1, // 每次展示一个对比
//     slidesToScroll: 1, // 每次滚动一个对比
//     dots: true, // 显示分页点
//     arrows: false, // 隐藏默认的左右箭头
//     customPaging: (i) => (
//       <button className="custom-dot">
//         {i + 1}
//       </button>
//     ),
//   };

//   return (
//     <div className="compare-container">
//       <Slider {...settings}>
//         {products.slice(0, products.length - 1).map((product1, index) => {
//           const product2 = products[index + 1];

//           return (
//             <div key={index} className="compare-page">
//               <div className="section">
//                 <div className="compare-header">特性对比</div>
//                 <div className="product">
//                   <h3>{product1.name}</h3>
//                   <ul>
//                     {product1.features.map((feature, index) => (
//                       <li key={index}>{feature}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="product">
//                   <h3>{product2.name}</h3>
//                   <ul>
//                     {product2.features.map((feature, index) => (
//                       <li key={index}>{feature}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <div className="section">
//                 <div className="compare-header">性能对比</div>
//                 <div className="product">
//                   <h3>{product1.name}</h3>
//                   <p>{product1.performance}</p>
//                 </div>
//                 <div className="product">
//                   <h3>{product2.name}</h3>
//                   <p>{product2.performance}</p>
//                 </div>
//               </div>

//               <div className="section">
//                 <div className="compare-header">价格对比</div>
//                 <div className="product">
//                   <h3>{product1.name}</h3>
//                   <p>{product1.price}</p>
//                 </div>
//                 <div className="product">
//                   <h3>{product2.name}</h3>
//                   <p>{product2.price}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Slider>
//     </div>
//   );
// };

// export default Compare;

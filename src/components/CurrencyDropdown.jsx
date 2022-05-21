// import React, { Component } from 'react';

// export class CurrencyDropdown extends Component {
//   // TODO: implement functionality when click outside the dropdown, the drop down disappear.
//   render() {
//     const { currencies, onCurrencyTabChange } = this.props;
//     // document.addEventListener('click', (e) => {
//     //   const target = e.target;
//     //   const dropDownList = document.getElementById('currencies-list');
//     //   const dropDownBtn = document.getElementById('btn--currency');
//     //   console.log(target, dropDownList, dropDownBtn);
//     //   if (target != dropDownList || target != dropDownBtn)
//     //     onCurrencyTabChange(false);
//     //   else onCurrencyTabChange(true);
//     // });
//     return (
//       <ul className="currencies-list" id="currencies-list">
//         {currencies.map((currency, index) => (
//           <li
//             className="currencies-list__item clickable"
//             key={currency.id || index}
//           >
//             <button
//               className="btn-reset currency-btn"
//               onClick={(e) => {
//                 console.log(currency.label);
//                 onCurrencyTabChange(false);
//               }}
//             >
//               {currency.symbol} {currency.label}
//             </button>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

// export default CurrencyDropdown;

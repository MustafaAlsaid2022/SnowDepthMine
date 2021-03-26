// import React from 'react'
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// function privateRoute({ component: Component, ...rest }) {

//   let isLogin = true

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isLogin ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

// export default privateRoute
import React from 'react'
import Hello from './container/hello'
import { Route, Switch } from 'react-router'

// then our route config
const routes = [
  {
    path: '/',
    component: Hello
  },
  {
    path: '/hello',
    component: Hello
  },
  {
    path: '/hello2',
    component: <div>error</div>
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route, index) => (
  <Route
    exact={index === 1}
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
)

const RouteConfig = () => (
  <Switch>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} index={i} />
    ))}
  </Switch>
)

// const RouteConfig = () => (
//   <Switch>
//     <Route path="/" component={Hello} />
//     <Route path="/hello" component={Hello} />
//   </Switch>
// )

export default RouteConfig()

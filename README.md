#  REACT - METAMASK Connection Tool
This is a simple component tool to connect to a metamask wallet from the front-end of
any React.js application. 

It determines whether a user has metamask installed and takes them through the steps of establishing a connection.  Once a connection is made, it displays account information for easy access.  

#  Dependencies
It uses the following dependencies to establish a connection:
-  MetaMask Onboarding library:  https://docs.metamask.io/guide/onboarding-library.html
-  MetaMask Detect Provider: https://www.npmjs.com/package/@metamask/detect-provider

It uses the following style libraries:
-  Styled Components: https://styled-components.com/
-  @yaireo/title-tooltip:  https://www.npmjs.com/package/@yaireo/title-tooltip
-  Nanopop:  https://github.com/Simonwep/nanopop

#  Use
To use the component:
-  Add the StatusBar component folder and the above dependancies
-  Ensure that you have imported lazy, suspense from react:
```
import { lazy, Suspense } from 'react';
```
-  Import component:
```
const StatusBar = lazy(()=>import("./Components/StatusBar"));
```
-  Place it surrounded by a suspense block into your app
```
<Suspense fallback={<div>Loading...</div>}>
      <StatusBar/>
</Suspense>
```
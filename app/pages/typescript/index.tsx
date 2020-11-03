import * as React from 'react'

import {Hello} from '../../components/hello'

const Typescript = () => <Hello compiler="TypeScript" framework="React" />

Typescript.getTemplateName = () => 'typescript'

export default Typescript

import './styles.css'
import { initState } from './core/state.js'
import { restore } from './modules/performance.js'

import './modules/plan.js'
import './modules/project.js'
import './modules/builder.js'
import './modules/report.js'
import './modules/assistant.js'
import './modules/drawing.js'
import './modules/policy.js'
import './modules/performance.js'

import './ui/layout.js'

initState()
restore()

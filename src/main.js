import './styles.css'

import { renderLayout } from './ui/layout.js'
import { initState } from './core/state.js'
import { restore } from './modules/performance.js'

import './modules/plan.js'
import './modules/project.js'
import './modules/report.js'
import './modules/assistant.js'
import './modules/drawing.js'
import './modules/performance.js'

import './modules/builder.js'
import './ui/builderView.js'

renderLayout()
initState()
restore()
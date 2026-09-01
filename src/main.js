import './styles.css'

import { initLayout } from './ui/layout.js'
import { initState } from './core/state.js'
import { restore } from './modules/performance.js'
import { initLibrary } from './core/library.js'
import { state } from './core/state.js'

import './modules/plan.js'
import './modules/project.js'
import './modules/report.js'
import './modules/assistant.js'
import './modules/drawing.js'
import { initBulkUpload } from './modules/bulkUpload.js'
import './modules/performance.js'

import './modules/builder.js'
import './ui/builderView.js'

initLayout()
initState()
restore()
initLibrary(state)
initBulkUpload()
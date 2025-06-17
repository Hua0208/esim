import appsAndPages from './apps-and-pages'
import charts from './charts'
import dashboard from './dashboard'
import forms from './forms'
import others from './others'
import uiElements from './ui-elements'
import type { VerticalNavItems } from '@layouts/types'
import customer from './customer'
import esim from './esim'
import billing from './billing'

//export default [...dashboard, ...appsAndPages, ...uiElements, ...forms, ...charts, ...others] as VerticalNavItems
export default [...dashboard, ...customer, ...esim, ...billing] as VerticalNavItems

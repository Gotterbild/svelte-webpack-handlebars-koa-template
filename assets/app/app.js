/* eslint-disable import/no-unresolved */
/* global $ */

import 'babel-polyfill'

// import all foundation files
// import 'foundation-sites/dist/js/foundation.js';

// import individual foundation files
/* @TODO 3/03/2017 - Various functionality missing
Probably best to wait until foundation has full ES2016 dependency support in 6.4 release */

// core and media query must be loaded first
import 'foundation-sites/js/foundation.core'
import 'foundation-sites/js/foundation.util.mediaQuery'

// utils must be loaded second
import 'foundation-sites/js/foundation.util.box'
import 'foundation-sites/js/foundation.util.keyboard'
import 'foundation-sites/js/foundation.util.motion'
import 'foundation-sites/js/foundation.util.nest'
import 'foundation-sites/js/foundation.util.timerAndImageLoader'
import 'foundation-sites/js/foundation.util.touch'
import 'foundation-sites/js/foundation.util.triggers'

// import 'foundation-sites/js/foundation.abide';
import 'foundation-sites/js/foundation.accordion'
// import 'foundation-sites/js/foundation.accordionMenu';
// import 'foundation-sites/js/foundation.drilldown';
import 'foundation-sites/js/foundation.dropdown'
// import 'foundation-sites/js/foundation.dropdownMenu';
import 'foundation-sites/js/foundation.equalizer'
// import 'foundation-sites/js/foundation.interchange';
// import 'foundation-sites/js/foundation.magellan';
import 'foundation-sites/js/foundation.offcanvas'
// import 'foundation-sites/js/foundation.orbit';
// import 'foundation-sites/js/foundation.responsiveMenu';
// import 'foundation-sites/js/foundation.responsiveToggle';
import 'foundation-sites/js/foundation.reveal'
import 'foundation-sites/js/foundation.slider'
// import 'foundation-sites/js/foundation.sticky';
import 'foundation-sites/js/foundation.tabs'
import 'foundation-sites/js/foundation.toggler'
import 'foundation-sites/js/foundation.tooltip'
// import 'foundation-sites/js/foundation.zf.responsiveAccordionTabs';

// Global logic
require('App/global') // must be first to make sure Storage logic is already fired to make MemoryStorage available for Safari

// Pages-related logic
require('App/home-page')

// Foundation
$(document).foundation()

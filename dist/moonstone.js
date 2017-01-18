(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = null;


	if (local) {
		Object.keys(local).forEach(function (name) {
			var value = local[name];
			if (manifest.hasOwnProperty(name)) {
				if (!value || !(value instanceof Array)) return;
			}
			manifest[name] = value;
		});
	}

	function defineProperty (o, p, d) {
		if (Object.defineProperty) return Object.defineProperty(o, p, d);
		o[p] = d.value;
		return o;
	}
	
	function enyoRequire (target) {
		if (!target || typeof target != 'string') return undefined;
		if (exported.hasOwnProperty(target))      return exported[target];
		var   request = enyo.request
			, entry   = manifest[target]
			, exec
			, map
			, ctx
			, reqs
			, reqr;
		if (!entry) throw new Error('Could not find module "' + target + '"');
		if (!(entry instanceof Array)) {
			if (typeof entry == 'object' && (entry.source || entry.style)) {
				throw new Error('Attempt to require an asynchronous module "' + target + '"');
			} else if (typeof entry == 'string') {
				throw new Error('Attempt to require a bundle entry "' + target + '"');
			} else {
				throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
			}
		}
		exec = entry[0];
		map  = entry[1];
		if (typeof exec != 'function') throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
		ctx  = {exports: {}};
		if (request) {
			if (map) {
				reqs = function (name) {
					return request(map.hasOwnProperty(name) ? map[name] : name);
				};
				defineProperty(reqs, 'isRequest', {value: request.isRequest});
			} else reqs = request;
		}
		reqr = !map ? require : function (name) {
			return require(map.hasOwnProperty(name) ? map[name] : name);
		};
		exec(
			ctx,
			ctx.exports,
			scope,
			reqr,
			reqs
		);
		return exported[target] = ctx.exports;
	}

	// in occassions where requests api are being used, below this comment that implementation will
	// be injected
	

	// if there are entries go ahead and execute them
	if (entries && entries.forEach) entries.forEach(function (name) { require(name); });
})(this, function () {
	// this allows us to protect the scope of the modules from the wrapper/env code
	return {'moonstone/options':[function (module,exports,global,require,request){
var
	utils = require('enyo/utils'),
	options = require('enyo/options');

var config = global.moon && global.moon.config;

/**
* Global *design-time* configuration options for Moonstone
*
* @param {Boolean} Set accelerate `false` to prefer position properties over CSS transforms.
* @module moonstone/options
*/
module.exports = utils.mixin({
	/** @lends module:moonstone/options */
	accelerate: true,
	renderOnShow: {
		expandableListDrawer: true
	}
}, options, config);

}],'moonstone/i18n':[function (module,exports,global,require,request){
var
	ResBundle = require('enyo-ilib/ResBundle');

/**
* Localized strings from [iLib]{@link ilib} translations.
*
* @param {String} string - String to be localized.
* @returns {String} Localized string.
* @name moon.$L
* @public
*/
var $L = function (string) {
	if (!$L.rb) {
		return string;
	}
	var str = $L.rb.getString(string);
	return str.toString();
};
$L.rb = new ResBundle({
	loadParams: {
		root: 'moonstone/resources'
	}
});

/**
* Exports the `$L()` i18n function from [iLib]{@link ilib}.
* @module moonstone/i18n
*/
module.exports = $L;

}],'moonstone/fonts':[function (module,exports,global,require,request){
/**
* This module loads Moonstone specific fonts. It has no exports and is not inteded to be directly
* included by external developers.
*
* @private
* @module moonstone/fonts
*/

var
	i18n = require('enyo/i18n');

var
	Locale = require('enyo-ilib/Locale');

/**
* `moon-fonts` is the locale-specific font generator, allowing any locale to have its own custom
* font. Each locale-font from the configuration block (defined in this file) is generated at
* run-time. If the locale you're currently in is in the locale-font list an additional
* `@font-face` rule will be generated that will override the standard "Moonstone LG Display"
* font.
*
* Below is example genarated-output of the Urdu ("ur") locale-font.
*
* ```css
* &#64;font-face {
* 	font-family: 'Moonstone LG Display ur';
* 	font-weight: normal;
* 	src: local('LG Display_Urdu');
* 	unicode-range: U+0600-U+06FF, U+FE70-U+FEFE, U+FB50-U+FDFF;
* }
* &#64;font-face {
* 	font-family: 'Moonstone LG Display ur Bold';
* 	font-weight: normal;
* 	src: local('LG Display_Urdu');
* 	unicode-range: U+0600-U+06FF, U+FE70-U+FEFE, U+FB50-U+FDFF;
* }
* &#64;font-face {
* 	font-family: 'Moonstone LG Display ur Light';
* 	font-weight: normal;
* 	src: local('LG Display_Urdu');
* 	unicode-range: U+0600-U+06FF, U+FE70-U+FEFE, U+FB50-U+FDFF;
* }
* ```
*
* @name International Fonts
* @public
*/

function funLocaleSpecificFonts () {
	var loc = new Locale(),
		language = loc.getLanguage(),
		region = loc.getRegion(),
		styleId = 'enyo-localization-font-override',
		styleElem = document.getElementById(styleId),
		fontDefinitionCss = '',
		// Locale Configuration Block
		fonts = {
			'NonLatin': {
				regular: 'LG Display-Light',
				bold:    'LG Display-Regular'
			},
			'ja': {
				regular: 'LG Display_JP'
			},
			'en-JP': {
				regular: 'LG Display_JP'
			},
			'ur': {
				regular: 'LG Display_Urdu',
				unicodeRanges:
					'U+600-6FF,' +
					'U+FE70-FEFE,' +
					'U+FB50-FDFF'
			},
			'zh-HK': {
				regular: 'LG Display GP4_HK-Light',
				bold:    'LG Display GP4_HK-Regular',
				unicodeRanges:
					'U+0-FF,' +
					'U+2E80-2EFF,' +
					'U+3000-303F,' +
					'U+3200-33FF,' +
					'U+3400-4DBF,' +
					'U+4E00-9FFF,' +
					'U+E000-FAFF,' +
					'U+FF00-FFEF'
			}
		};

	// Duplications and alternate locale names
	fonts['zh-TW'] = fonts['zh-HK'];

	// Generate a single font-face rule
	this.buildFont = function(inOptions) {
		if (!inOptions && !inOptions.name) {
			return '';
		}
		var strOut = '@font-face { \n' +
			'  font-family: "' + inOptions.name + '";\n' +
			'  font-weight: ' + ( inOptions.weight || 'normal' ) + ';\n';

		if (inOptions.localName) {
			strOut+= '  src: local("' + inOptions.localName + '");\n';
		}
		if (inOptions.unicodeRanges) {
			strOut+= '  unicode-range: ' + inOptions.unicodeRanges + ';\n';
		}
		strOut+= '} \n';
		return strOut;
	};

	// Generate a collection of font-face rules, in multiple font-variants
	this.buildFontSet = function(strLang, bitDefault) {
		var strOut = '',
			name = (bitDefault) ? '' : ' ' + strLang;

		if (fonts[strLang].regular) {
			// Build Regular
			strOut+= this.buildFont({
				name: 'Moonstone LG Display' + name,
				localName: fonts[strLang].regular,
				unicodeRanges: fonts[strLang].unicodeRanges
			});

			// Build Bold
			strOut+= this.buildFont({
				name: 'Moonstone LG Display' + name + ' Bold',
				localName: fonts[strLang].bold || fonts[strLang].regular,
				unicodeRanges: fonts[strLang].unicodeRanges
			});

			// Build Light
			strOut+= this.buildFont({
				name: 'Moonstone LG Display' + name + ' Light',
				localName: fonts[strLang].light || fonts[strLang].regular,
				unicodeRanges: fonts[strLang].unicodeRanges
			});
		}
		return strOut;
	};

	if (!styleElem) {
		styleElem = document.createElement('style');
		styleElem.setAttribute('id', styleId);
		document.head.appendChild(styleElem);
	}

	// Build all the fonts so they could be explicitly called
	for (var lang in fonts) {
		fontDefinitionCss+= this.buildFontSet(lang);
	}

	// Set up the override so "Moonstone LG Display" becomes the local-specific font.
	if (language === 'ja') {
		fontDefinitionCss+= this.buildFontSet('ja', true);
	}
	else if (language === 'en' && region === 'JP') {
		fontDefinitionCss+= this.buildFontSet('en-JP', true);
	}
	else if (language === 'ur') {
		fontDefinitionCss+= this.buildFontSet('ur', true);
	}
	else if (language === 'zh' && region === 'HK') {
		fontDefinitionCss+= this.buildFontSet('zh-HK', true);
	}
	else if (language === 'zh' && region === 'TW') {
		fontDefinitionCss+= this.buildFontSet('zh-TW', true);
	}

	styleElem.innerHTML = fontDefinitionCss;
}

i18n.updateLocale.extend(function (sup) {
	return function() {
		sup.apply(this, arguments);
		funLocaleSpecificFonts();
	};
});

funLocaleSpecificFonts();

}],'moonstone/resolution':[function (module,exports,global,require,request){
/**
* Defines TV-specific resolution values. See {@link module:enyo/resolution} for more details.
* @module moonstone/resolution
*/
var
	ri = require('enyo/resolution');

ri.defineScreenTypes([
	{name: 'hd',      pxPerRem: 16, width: 1280, height: 720,  aspectRatioName: 'hdtv'},
	{name: 'fhd',     pxPerRem: 24, width: 1920, height: 1080, aspectRatioName: 'hdtv', base: true},
	{name: 'uw-uxga', pxPerRem: 24, width: 2560, height: 1080, aspectRatioName: 'cinema'},
	{name: 'uhd',     pxPerRem: 48, width: 3840, height: 2160, aspectRatioName: 'hdtv'}
]);

module.exports = ri;

}],'moonstone':[function (module,exports,global,require,request){
'use strict';

// Many moonstone controls require ilib components but do not directly require the base module which
// is necessary to include the locale assets.
require('enyo-ilib');

var
	platform = require('enyo/platform'),
	dispatcher = require('enyo/dispatcher'),
	gesture = require('enyo/gesture');

exports = module.exports = require('./src/options');
exports.version = '2.7.0';

// Override the default holdpulse config to account for greater delays between keydown and keyup
// events in Moonstone with certain input devices.
gesture.drag.configureHoldPulse({
	events: [{name: 'hold', time: 400}],
	endHold: 'onLeave'
});

/**
* Registers key mappings for webOS-specific device keys related to media control.
*
* @private
*/
if (platform.webos >= 4) {
	// Table of default keyCode mappings for webOS device
	dispatcher.registerKeyMap({
		415 : 'play',
		413 : 'stop',
		19  : 'pause',
		412 : 'rewind',
		417 : 'fastforward',
		461 : 'back'
	});
}

// ensure that these are registered
require('./src/resolution');
require('./src/fonts');

},{'./src/options':'moonstone/options','./src/resolution':'moonstone/resolution','./src/fonts':'moonstone/fonts'}],'moonstone/BodyText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/BodyText~BodyText} kind.
* @module moonstone/BodyText
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');
/**
* {@link module:moonstone/BodyText~BodyText} is a simple control for displaying body text in an app.
* It is designed to align with other text-based controls.
*
* @class BodyText
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/BodyText~BodyText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.BodyText',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-body-text-spacing moon-body-text-control',

	/**
	*
	* When `true`, HTML tags are allowed in the control's content.
	*
	* @type {Boolean}
	* @default true
	* @public
	*/
	allowHtml: true,

	/**
	* @private
	* @lends module:moonstone/BodyText~BodyText.prototype
	*/
	published: {

		/**
		* If `true`, text content is centered; otherwise, it is left-aligned.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		centered: false
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.centeredChanged();
	},

	/**
	* @private
	*/
	contentChanged: function () {
		Control.prototype.contentChanged.apply(this, arguments);
		this.detectTextDirectionality();
		if (this.hasNode()) { this.bubble('onRequestSetupBounds'); }
	},

	/**
	* @private
	*/
	centeredChanged: function () {
		this.applyStyle('text-align', this.centered ? 'center' : null);
	}
});

}],'moonstone/HistorySupport':[function (module,exports,global,require,request){
require('moonstone');

/**
* Mixin that enables support for custom history.
*
* @module moonstone/HistorySupport
*/

var
	EnyoHistory = require('enyo/History'),
	kind = require('enyo/kind');

/**
* {@link module:moonstone/HistorySupport} is a {@glossary mixin} that enables
* support for custom history. In its current iteration, "back" actions are
* implemented, allowing controls to override and customize the behavior that
* occurs when the back key is pressed or the `window.history` is utilized.
*
* @mixin
* @public
*/
var HistorySupport = {

	/**
	* @private
	*/
	name: 'HistorySupport',

	/**
	* @private
	*/
	published: {

		/**
		* When `true`, pressing the back key will result in control-specific behavior that
		* corresponds to a "back" action.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		allowBackKey: true
	},

	/**
	* Pushes a default state to the back history, consisting of a reference to our
	* handler for any "back" actions.
	*
	* If the default `pushBackHistory()` behavior is to be overridden, make sure
	* that the control's implementation of `pushBackHistory()` signifies that it
	* has handled the necessary behavior by returning `true`, e.g.:
	*
	* ```javascript
	* 	pushBackHistory: function() {
	* 		// perform custom operations here
	* 		return true;
	* 	}
	* ```
	*
	* @method
	* @public
	*/
	pushBackHistory: kind.inherit(function (sup) {
		// When you use a mixin, it will override existing properties and methods. If a control
		// that uses `moonstone/HistorySupport` has implemented the `pushBackHistory()` method, the
		// method will be replaced with the following method. To ensure that the control's
		// implementation of `pushBackHistory()` is executed, we allow it to run and subsequently
		// examine its return value.
		return function () {
			// check whether this control's `pushBackHistroy` method has effectively handled
			// the call, or whether it wants the inherited method to execute
			if (!sup.apply(this, arguments)) {
				EnyoHistory.push({context: this, handler: this.backKeyHandler});
			}
			return true;
		};
	}),

	/**
	* Handler for whenever a "back" action is triggered. The default behavior is to hide the
	* control if it is showing.
	*
	* Most controls will want to override this behavior. If the default behavior should not be
	* executed, ensure that the `backKeyHandler()` method in the control signifies that it has
	* handled the necessary behavior by returning `true`.
	*
	* @method
	* @public
	*/
	backKeyHandler: kind.inherit(function (sup) {
		return function () {
			if (!sup.apply(this, arguments)) {
				if (this.showing) this.hide();
			}
			return true;
		};
	})
};

module.exports = HistorySupport;

}],'moonstone/MoonAnimator':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/MoonAnimator~MoonAnimator} kind.
* @module moonstone/MoonAnimator
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Animator = require('enyo/Animator'),
	animation = require('enyo/animation');



/**
* {@link module:moonstone/MoonAnimator~MoonAnimator} is an animation for breadcrumb panels.
*
* @class MoonAnimator
* @extends module:enyo/Animator~Animator
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/MoonAnimator~MoonAnimator.prototype */ {

	/**
	* A context in which to run the specified {@glossary event} handlers. If this is
	* not specified or is falsy, then the [window object]{@glossary window} is used.
	*
	* @name context
	* @type {Object}
	* @default undefined
	* @memberOf module:moonstone/MoonAnimator~MoonAnimator.prototype
	* @public
	*/

	/**
	* @private
	*/
	name: 'moon.MoonAnimator',

	/**
	* @private
	*/
	kind: Animator,

	/**
	* @private
	*/
	published: /** @lends module:moonstone/MoonAnimator~MoonAnimator.prototype */ {
		direction: 'forward',

		useBezier: false,

		configs: {}
	},

	/**
	* @private
	*/
	accuracy: 0.01,

	/**
	* @private
	*/
	values: {},

	/**
	* @private
	*/
	fractions: {},

	/**
	* @private
	*/
	debug: false,

	/**
	* @private
	*/
	constructed: function () {
		Animator.prototype.constructed.apply(this, arguments);
		this.buildBezierTable();
	},

	/**
	* @private
	*/
	bezier: function (t, x1, y1, x2, y2) {
		var p0 = {x: 0, y: 0}, p1 = {x: x1, y: y1}, p2 = {x: x2, y: y2}, p3 = {x: 1, y: 1};
		var cX = 3 * (p1.x - p0.x),
			bX = 3 * (p2.x - p1.x) - cX,
			aX = p3.x - p0.x - cX - bX;

		var cY = 3 * (p1.y - p0.y),
			bY = 3 * (p2.y - p1.y) - cY,
			aY = p3.y - p0.y - cY - bY;

		var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
		var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

		return {x: x, y: y};
	},

	/**
	* Adds configuration for animation.
	*
	* The config can be specified for each object that needs to be animated.
	* Each config consists of two directions, forward and backward.
	*
	* ```javascript
	* panel: {
	* 	forward: { startValue: 0, endValue: 1, delay: 0, duration: 430, bezier: [.69,.01,.97,.59]},
	* 	backward: { startValue: 0, endValue: 1, delay: 0, duration: 500, bezier: [.06,.53,.38,.99] }
	* }
	* ```
	*
	* @param {Object} config
	* @public
	*/
	addConfig: function (config) {
		if (config) {
			util.mixin(this.configs, config);
		}
		this.buildBezierTable();
	},

	/**
	* Builds bezier curve table as a function of x and y.
	* Interpolates the intermediate values in the table.
	*
	* @private
	*/
	buildBezierTable: function () {
		if (!this.useBezier) return;

		var start = util.perfNow(), end;

		this.iterateConfig(this, function(obj, dir, config) {
			var last = {x:0, y:0},
				conf = config.bezier,	// Format: { x1, y1, x2, y2 }, values between 0 and 1
				ret, i, j;

			config.bezierTable = {};

			for (i = 0; i <= 1; i += this.accuracy){
				// Todo: Modify bezier function to have input as x and output as y.
				ret = this.bezier(i, conf[0], conf[1], conf[2], conf[3]);

				// Linear Interpolation
				//  - Bezier curve table which is having X as a key between 0 and 100.
				//  - Y value is having value between 0 and 1.
				for (j = last.x; j < ret.x; j += 0.01) {
					config.bezierTable[(j*100)<<0] = last.y + (j - last.x) * (ret.y-last.y) / (ret.x - last.x);
				}
				last = ret;
			}
			// Fill rest of table to 1
			for (i = (last.x*100)<<0; i <= 100; i++) {
				config.bezierTable[i] = 1;
			}
		});

		end = util.perfNow();

		if (this.debug) {
			this.log('Build Bezier Table takes', end - start, 'ms');
		}
	},


	/**
	* Plays the animation.
	*
	* @param {Object} props - As a convenience, this [hash]{@glossary Object} will be mixed
	*	directly into this [object]{@glossary Object}.
	* @public
	*/
	play: function (props) {
		var duration = 0;

		// Find maximum duration for the whole animation
		this.iterateConfig(this, function(obj, dir, config) {
			this.values[obj] = config.startValue;
			duration = Math.max(config.delay + config.duration, duration);
		}, this.direction);

		this.duration = duration;

		Animator.prototype.play.apply(this, arguments);

		return this;
	},

	/**
	* Reverses the direction of a running animation.
	*
	* @return {this} The callee for chaining.
	* @public
	*/
	reverse: function () {
		if (this.isAnimating()) {
			Animator.prototype.reverse.apply(this, arguments);
			this.iterateConfig(this, function(obj, dir, config) {
				// swap start and end values
				var startValue = config.startValue;
				config.startValue = config.endValue;
				config.endValue = startValue;
			}, this.direction);
			return this;
		}
	},

	/**
	* Runs the next step of the animation.
	*
	* @fires module:enyo/Animator~Animator#onStep
	* @fires module:enyo/Animator~Animator#onEnd
	* @private
	*/
	next: function () {
		this.t1 = util.perfNow();
		this.dt = this.t1 - this.t0;
		this.fraction = this.dt / this.duration;

		this.iterateConfig(this, function(obj, dir, config) {
			var fraction, f;

			if (this.dt - config.delay < 0) return;

			if (this.dt - config.delay >= config.duration) {
				this.values[obj] = config.endValue;
				this.fractions[obj] = 1;
				return;
			}

			if (this.useBezier) {
				// Use bezier function
				fraction = (this.dt - config.delay) / config.duration;
				f = this.fractions[obj] = config.bezierTable[(fraction*100)<<0];
				this.values[obj] = config.startValue + f * (config.endValue - config.startValue);
			} else {
				// Use easing function
				if (config.easing.length === 1) {
					// time independent
					this.fractions[obj] = animation.easedLerp(this.t0 + config.delay, config.duration, config.easing, this.reversed);
					this.values[obj] = config.startValue + this.fractions[obj] * (config.endValue - config.startValue);
				} else {
					this.values[obj] = animation.easedComplexLerp(this.t0 + config.delay, config.duration, config.easing, this.reversed,
						this.dt - config.delay, config.startValue, (config.endValue - config.startValue));
				}
			}
		}, this.direction);

		if (this.shouldEnd()) {
			this.fire('onStep');
			this.cancel();
			util.asyncMethod(this.bindSafely(function() {
				this.fire('onEnd');
			}));
		} else {
			this.fire('onStep');
			this.requestNext();
		}
	},

	/**
	* @private
	*/
	iterateConfig: function (scope, callback, direction) {
		var obj, dir;

		for (obj in this.configs) {
			if (direction) {
				// for specified direction
				callback.call(scope, obj, direction, this.configs[obj][direction]);
			} else {
				// for all directions
				for (dir in this.configs[obj]) {
					callback.call(scope, obj, dir, this.configs[obj][dir]);
				}
			}
		}
	}
});

}],'moonstone/MoonArranger':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/MoonArranger~MoonArranger} kind.
* @module moonstone/MoonArranger
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	Arranger = require('layout/Arranger');

/**
*	{@link module:moonstone/MoonArranger~MoonArranger} is a
* {@link module:layout/Arranger~Arranger} that displays the active control.
* The active control is positioned on the right side of the container and the
* breadcrumbs are laid out to the left.
*
* For more information, see the documentation on
* [Arrangers](building-apps/layout/arrangers.html) in the Enyo Developer Guide.
*
* @class MoonArranger
* @extends module:layout/Arranger~Arranger
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/MoonArranger~MoonArranger.prototype */ {
	name: 'moon.MoonArranger',
	kind: Arranger,
	
	//* @protected
	size: function () {
		this.calcTransitionPositions();
	},
	/**
	* Called when panel is created dynamically.
	*
	* @protected
	*/
	calcTransitionPositions: function () {
		var container = this.container,
			panels = container.getPanels(),
			length = panels ? panels.length : 0;

		container.transitionPositions = {};

		for (var i=0; i<length; i++) {
			for (var j=0; j<length; j++) {
				container.transitionPositions[j + '.' + i] = (j - i);
			}
		}
	},
	arrange: function (controls, index) {
		var container = this.container,
			panels = container.getPanels(),
			active = container.clamp(index),
			control, xPos;

		for (var i=0; (control=panels[i]); i++) {
			xPos = container.transitionPositions[i + '.' + active];
			this.arrangeControl(control, {left: xPos*100});
		}
	},
	flowArrangement: function () {
		this.flowPanel();
		this.flowBreadcrumb();
	},
	flowPanel: function () {
		var container = this.container,
			arrangements = container.arrangement,
			panels = container.getPanels(),
			control, i;

		if (arrangements && arrangements.panel) {
			// Flow panel
			for (i=0; (control=panels[i]) && (arrangements.panel[i]); i++) {
				this.flowControl(control, arrangements.panel[i]);
			}
		}
	},
	flowBreadcrumb: function () {
		var container = this.container,
			arrangements = container.arrangement,
			range = this.container.getBreadcrumbRange(),
			arrangement, control, i;

		if (arrangements && arrangements.breadcrumb) {
			for (i=range.start; i<range.end; i++) {
				// Select breadcrumb to arrange for the given panel index
				// If we have a window of [2, 3] then we choose breadcrumb [0, 1].
				// If we have a window of [3, 4] then we choose breadcrumb [1, 0].
				control = container.getBreadcrumbForIndex(i);

				// For the first panel, we arrange all breadcrumb to offscreen area.
				arrangement = (i>=0) ? arrangements.breadcrumb[i] : {left: 0};
				
				this.flowControl(control, arrangement);
			}
		}
	},
	wrap: function (value, length) {
		return (value+length)%length;
	},
	flowControl: function (control, arrangement) {
		Arranger.positionControl(control, arrangement, '%');
	},
	destroy: function() {
		var panels = this.container.getPanels();
		for (var i=0, control; (control=panels[i]); i++) {
			Arranger.positionControl(control, {left: null, top: null});
			control.applyStyle('top', null);
			control.applyStyle('bottom', null);
			control.applyStyle('left', null);
			control.applyStyle('width', null);
		}
		Arranger.prototype.destroy.apply(this, arguments);
	},

	/**
	* Returns `true` if any panels will move in the transition from `fromIndex` to `toIndex`.
	* @private
	*/
	shouldArrange: function (fromIndex, toIndex) {
		if (!(fromIndex >= 0 && toIndex >= 0)) {
			return;
		}

		var transitionPositions = this.container.transitionPositions,
			panelCount = this.container.getPanels().length,
			panelIndex,
			from,
			to;

		if (transitionPositions) {
			for (panelIndex = 0; panelIndex < panelCount; panelIndex++) {
				from = transitionPositions[panelIndex + '.' + fromIndex];
				to = transitionPositions[panelIndex + '.' + toIndex];

				if (from !== to) {
					return true;
				}
			}
		}

		return false;
	}
});

}],'moonstone/StyleAnimator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/StyleAnimator~StyleAnimator} kind.
* @module moonstone/StyleAnimator
* @deprecated
* @private
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	log = require('enyo/logger'),
	utils = require('enyo/utils'),
	Component = require('enyo/Component');

/**
* @typedef {Object} module:moonstone/StyleAnimator~StyleAnimator~AnimationDefinitionObject
* @property {String} name - An optional name for the animation. If not specified,
* a name will be generated.
* @property {Number} duration - An optional duration. If not specified, the
*	[default duration]{@link module:moonstone/StyleAnimator~StyleAnimator#defaultDuration} will be used.
* @property {Object} timingFunction - An optional timing function. If not specified, the
*	[default timing function]{@link module:moonstone/StyleAnimator~StyleAnimator#defaultTimingFunction} will be used.
* @property {String} direction - `'forward'` or `'backward'`. Currently unused.
* @property {Object[]} keyframes - Animation keyframes.
* @public
*/

/**
* Fires when an animation step occurs.
*
* @event module:moonstone/StyleAnimator~StyleAnimator#onStep
* @type {Object}
* @property {Object} animation - A reference to the animation that generated the event.
* @public
*/

/**
* Fires when the animation completes.
*
* @event module:moonstone/StyleAnimator~StyleAnimator#onComplete
* @type {Object}
* @property {Object} animation - A reference to the animation that completed.
* @public
*/

/**
* {@link module:moonstone/StyleAnimator~StyleAnimator} is a basic animation component.  Call
* [play()]{@link module:moonstone/StyleAnimator~StyleAnimator#play} to start the animation.  The animation will run for
* the period of time (in milliseconds) specified by its `duration`, subject to its
* `timingFunction` and `direction` (See: {@link module:moonstone/StyleAnimator~StyleAnimator~AnimationDefinitionObject}).
*
* @class StyleAnimator
* @extends module:enyo/Component~Component
* @private
* @deprecated
*/
module.exports = kind(
	/** @lends module:moonstone/StyleAnimator~StyleAnimator.prototype */ {

	/**
	* @private
	*/
	name: 'enyo.StyleAnimator',

	/**
	* @private
	*/
	kind: Component,

	/**
	* @private
	*/
	events: {
		onStep: '',
		onComplete: ''
	},

	/**
	* @private
	* @lends module:moonstone/StyleAnimator~StyleAnimator.prototype
	*/
	published: {
		//* Default value used if the animation has no `duration` specified.
		defaultDuration: 1000,
		//* Default value used if the animation has no `timingFunction` specified.
		defaultTimingFunction: 'linear',
		//* Default value used if the animation has no `direction` specified.
		defaultDirection: 'forward'
	},

	/**
	* @private
	*/
	transitionProperty: dom.transition,

	/**
	* @private
	*/
	instructions: null,

	/**
	* @private
	*/
	stepInterval: null,

	/**
	* @private
	*/
	stepIntervalMS: 50,

	/**
	* @private
	*/
	startTime: null,

	/**
	* @private
	*/
	animations: null,

	/**
	* @private
	*/
	create: function () {
		Component.prototype.create.apply(this, arguments);
		this.animations = [];
	},

	/**
	* Returns animation object reflecting the passed-in properties, while also adding it to the
	* `animations` array.
	*
	* @param {module:moonstone/StyleAnimator~StyleAnimator~AnimationDefinitionObject} props - An animation definition hash.
	* @public
	*/
	newAnimation: function (props) {
		// TODO: Add documentation for the generated animation object
		if (this.animations && props.name && this.getAnimation(props.name)) {
			this.deleteAnimation(props.name);
		}

		props.keyframes = this.formatKeyframes(props.keyframes);
		props.instructions = this.generateInstructions(props.keyframes);

		var animation = {
			name:           props.name || this.generateAnimationName(),
			duration:       props.duration || this.defaultDuration,
			timingFunction: props.timingFunction ? this.updateTimingFunction (props.timingFunction) : this.updateTimingFunction (this.defaultTimingFunction),
			direction:      props.direction || this.defaultDirection,
			timeElapsed:    0,
			keyframes:      props.keyframes,
			instructions:   props.instructions,
			state:          'paused'
		};

		this.animations.push(animation);

		return animation;
	},

	/**
	* Resets transition properties to their pre-transition state for the specified animation.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	reset: function (name) {
		this.getAnimation(name);
		this._reset(name);
	},

	/**
	* Plays the animation according to its properties.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	play: function (name) {
		var animation = this.getAnimation(name);

		if (!animation) {
			return;
		}

		this.findStartAndEndValues(animation);
		this.applyValues(animation.startValues);
		this.cacheStartValues(animation.startValues);

		utils.asyncMethod(this.bindSafely(function () { this._play(name); }));
	},

	/**
	* Jumps directly to the end state of a given animation (without animating).
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	jumpToEnd: function (name) {
		var animation = this.getAnimation(name);

		if (!animation) {
			return;
		}

		this.findStartAndEndValues(animation);
		this.applyValues(animation.endValues);
	},

	/**
	* Pauses the animation, if it is currently playing.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	pause: function (name) {
		var animation = this.getAnimation(name);
		if (animation.state === 'playing') {
			this._pause(name);
		}
	},

	/**
	* Looks up an animation by name in the animation list.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	getAnimation: function (name) {
		var animation = null;
		for (var i = 0; i < this.animations.length; i++) {
			if (this.animations[i].name === name) {
				animation = this.animations[i];
				break;
			}
		}
		return animation;
	},

	/**
	* Removes an existing animation from `this.animations`, stopping it first, if necessary.
	*
	* @param {String} name - Name of the animation.
	* @public
	*/
	deleteAnimation: function (name) {
		var animation = this.getAnimation(name);

		if (!animation) {
			return false;
		}

		// Pause animation if necessary
		this._pause(name);

		// Splice out this animation
		this.animations.splice(this.animations.indexOf(animation), 1);
	},

	/**
	* Begins stepping through the animation.
	*
	* @public
	*/
	start: function () {
		this.beginStepping();
	},

	/**
	* Stops stepping through the animation.
	*
	* @public
	*/
	stop: function () {
		this.stopStepping();
	},

	/**
	* Generates a unique name based on the length of `this.animations`.
	*
	* @private
	*/
	generateAnimationName: function () {
		var count = this.animations.length,
			name = this.getName()+'_animation_'+count;
		while (this.getAnimation(name)) {
			name = this.getName()+'_animation_'+count;
		}
		return name;
	},

	/**
	* @private
	*/
	formatKeyframes: function (inKeyframes) {
		var frames = [];
		for (var index in inKeyframes) {
			frames.push({index: index, controls: inKeyframes[index]});
		}
		return frames;
	},

	/**
	* @private
	*/
	updateTimingFunction: function (inTimingFunction) {
		return inTimingFunction.match(/\bcubic-bezier/i) ? inTimingFunction : this.convertTimingFunctionToBezier(inTimingFunction);
	},

	/**
	* @private
	*/
	convertTimingFunctionToBezier: function (timing) {
		switch (timing) {
		case 'linear':
			return 'cubic-bezier(0, 0, 1, 1)';
		case 'ease':
			return 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
		case 'ease-in':
			return 'cubic-bezier(.42, 0, 1, 1)';
		case 'ease-out':
			return 'cubic-bezier(0, 0, .58, 1)';
		case 'ease-in-out':
			return 'cubic-bezier(.42, 0, .58, 1)';
		}
		log.warn('Unknown timing function: ', timing);
		return timing;
	},

	/**
	* @private
	*/
	generateInstructions: function (inKeyframes) {
		var frames = inKeyframes,
			instructions = [],
			instruction,
			endValues;

		for (var i = 0; i < frames.length-1; i++) {
			for (var j = 0, control; (control = frames[i].controls[j]); j++) {
				for (var prop in control.properties) {

					instruction = {
						control: control.control,
						property: prop,
						startValue: control.properties[prop],
						startTime: frames[i].index
					};

					endValues = this.findInstructionEndValues(instruction, i+1, frames);

					// If no end values, skip this rule   TODO - is this right?
					if (!endValues) {
						continue;
					}

					// Mix in end values
					instructions.push(utils.mixin(instruction, endValues));
				}
			}
		}

		return instructions;
	},

	/**
	* @private
	*/
	findStartAndEndValues: function (inAnimation) {
		var frames = inAnimation.keyframes,
			startValues = {},
			endValues = {},
			c,
			cID;

		for (var i = 0; i < frames.length; i++) {
			for (var j = 0, control; (control = frames[i].controls[j]); j++) {
				c = control.control;
				cID = c.id;

				if (!startValues[cID]) {
					startValues[cID] = {
						control: c,
						properties: {}
					};
				}
				if (!endValues[cID]) {
					endValues[cID] = {
						control: c,
						properties: {}
					};
				}

				for (var prop in control.properties) {
					// If value is set to _current_, grab the computed value
					if (control.properties[prop] === 'current') {
						control.properties[prop] = dom.getComputedStyle(c.hasNode())[prop];
					}
					// at zero, every prop is a startvalue
					if (i === 0 || typeof startValues[cID]['properties'][prop] === 'undefined') {
						startValues[cID]['properties'][prop] = control.properties[prop];
					}

					endValues[cID]['properties'][prop] = control.properties[prop];
				}
			}
		}

		inAnimation.startValues = startValues;
		inAnimation.endValues = endValues;
	},

	/**
	* @private
	*/
	findInstructionEndValues: function (inInstruction, inFrameIndex, inFrames) {
		for (var i = inFrameIndex; i < inFrames.length; i++) {
			for (var j = 0, control; (control = inFrames[i].controls[j]); j++) {
				if (control.control !== inInstruction.control) {
					continue;
				}
				for (var prop in control.properties) {
					if (prop === inInstruction.property) {
						return {endValue: control.properties[prop], endTime: inFrames[i].index};
					}
				}
			}
		}
	},

	/**
	* @private
	*/
	_play: function (name) {
		this.startAnimation(name);
		this.beginStepping();
	},

	/**
	* @private
	*/
	startAnimation: function (name) {
		var animation = this.getAnimation(name);

		this.applyTransitions(name, 0);
		animation.state = 'playing';
		animation.timeElapsed = 0;
		animation.startTime = utils.perfNow();
	},

	/**
	* @private
	*/
	applyValues: function (inValues) {
		var item, prop, control;

		for(item in inValues) {
			control = inValues[item].control;

			for (prop in inValues[item].properties) {
				control.applyStyle(prop, inValues[item].properties[prop]);
			}
		}
	},

	/**
	* @private
	*/
	cacheStartValues: function (inStartValues) {
		var item, control;
		this.startValues = inStartValues;

		for(item in inStartValues) {
			control = inStartValues[item].control;
			inStartValues[item].properties[this.transitionProperty] = control[this.transitionProperty];
		}
	},

	/**
	* @private
	*/
	applyTransitions: function (name, inStartTime) {
		var animation = this.getAnimation(name),
			instructions = animation.instructions;
		for (var i = 0; i < instructions.length; i++) {
			if (instructions[i].startTime <= inStartTime && !instructions[i].started) {
				this.applyTransition(name, instructions[i]);
				instructions[i].started = true;
			}
		}
	},

	/**
	* @private
	*/
	applyTransition: function (name, inInstruction) {
		var animation = this.getAnimation(name),
			currentStyle = inInstruction.control[this.transitionProperty],
			transitionTime = (inInstruction.endTime - inInstruction.startTime)*animation.duration/(100*1000),
			newStyle = currentStyle ? currentStyle + ', ' : '',
			transitionProperty = this.transitionProperty;

		newStyle += inInstruction.property + ' ' + transitionTime + 's ' + animation.timingFunction + ' 0s';

		inInstruction.control.applyStyle(transitionProperty, newStyle);

		// we arbitrarily cache this value for cheaper lookup later
		inInstruction.control[transitionProperty] = newStyle;

		inInstruction.control.applyStyle(inInstruction.property, inInstruction.endValue);

		//  this.log(inInstruction.control.id+'.applyStyle('+transitionProperty+', '+newStyle+')');
		//  this.log(inInstruction.control.id+'.applyStyle('+inInstruction.property+', '+inInstruction.endValue+')');
	},

	/**
	* Begins stepping.
	*
	* @private
	*/
	beginStepping: function () {
		if (!this.stepInterval) {
			this.stepInterval = setInterval(this.bindSafely('_step'), this.stepIntervalMS);
		}
	},

	/**
	* Stops stepping.
	*
	* @private
	*/
	stopStepping: function () {
		if (this.stepInterval) {
			clearInterval(this.stepInterval);
			this.stepInterval = null;
		}
	},

	/**
	* Steps through each playing animation.
	*
	* @private
	*/
	_step: function () {
		var playingAnimations = false,
			now = utils.perfNow(),
			animation,
			elapsed,
			i;

		for (i = 0; (animation = this.animations[i]); i++) {
			if (animation.state === 'paused') {
				continue;
			}

			elapsed = now - animation.startTime;

			// If complete, bail
			if (elapsed > animation.duration) {
				if (animation.percentElapsed != 100) {
					this.applyTransitions(animation.name, 100);
				}
				animation.percentElapsed = 100;
				this.doStep({animation: animation});
				this.completeAnimation(animation.name);
				return;
			}

			animation.timeElapsed = elapsed;
			animation.percentElapsed = Math.round(elapsed*100/animation.duration);
			this.applyTransitions(animation.name, animation.percentElapsed);
			playingAnimations = true;

			// Bubble step event
			this.doStep({animation: animation});
		}

		if (!playingAnimations) {
			this.stop();
		}
	},

	/**
	* @private
	*/
	completeAnimation: function (name) {
		var animation = this.getAnimation(name);

		this._pause(name);
		this._reset(name);
		this.doComplete({animation: animation});
	},

	/**
	* Resets transition properties to their pre-transition values.
	*
	* @private
	*/
	_reset: function (name) {
		var animation = this.getAnimation(name);
		for(var item in animation.startValues) {
			animation.startValues[item].control.applyStyle(this.transitionProperty, animation.startValues[item].properties[this.transitionProperty]);
		}
	},

	/**
	* @private
	*/
	_pause: function (name) {
		var animation = this.getAnimation(name);
		animation.state = 'paused';
	}
});

}],'moonstone/Icon':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Icon~Icon} kind.
* @module moonstone/Icon
*/

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	path = require('enyo/pathResolver'),
	Control = require('enyo/Control');

// Static private hash of all of the valid moonstone icons
var icons = {
	plus              : '&#43;',      // \0002B plus
	minus             : '&#45;',      // \0002D hyphen
	arrowhookleft     : '&#8617;',    // \021A9 LeftArrowHook
	arrowhookright    : '&#8618;',    // \021AA RightArrowHook
	ellipsis          : '&#8943;',    // \022EF ellipsis
	check             : '&#10003;',   // \02713 checkmark
	circle            : '&#983003;',  // \0EFFDB record
	stop              : '&#983004;',  // \0EFFDC stop
	play              : '&#983005;',  // \0EFFDD play
	pause             : '&#983006;',  // \0EFFDE pause
	forward           : '&#983007;',  // \0EFFDF forward
	backward          : '&#983008;',  // \0EFFE0 rewind
	skipforward       : '&#983009;',  // \0EFFE1 skip_forward
	skipbackward      : '&#983010;',  // \0EFFE2 skip_backwards
	pauseforward      : '&#983011;',  // \0EFFE3 indicator_forward
	pausebackward     : '&#983012;',  // \0EFFE4 indicator_backward
	pausejumpforward  : '&#983013;',  // \0EFFE5 indicator_skip_forward
	pausejumpbackward : '&#983014;',  // \0EFFE6 indicator_skip_backward
	jumpforward       : '&#983015;',  // \0EFFE7 indicator_end
	jumpbackward      : '&#983016;',  // \0EFFE8 indicator_begin
	denselist         : '&#983017;',  // \0EFFE9 list_big
	bulletlist        : '&#983018;',  // \0EFFEA list_bullets
	list              : '&#983019;',  // \0EFFEB list_simple
	drawer            : '&#983020;',  // \0EFFEC list_actions
	arrowlargedown    : '&#983021;',  // \0EFFED caret_down_large
	arrowlargeup      : '&#983022;',  // \0EFFEE caret_up_large
	arrowlargeleft    : '&#983023;',  // \0EFFEF caret_left_large
	arrowlargeright   : '&#983024;',  // \0EFFF0 caret_right_large
	arrowsmallup      : '&#983025;',  // \0EFFF1 caret_up_small
	arrowsmalldown    : '&#983026;',  // \0EFFF2 caret_down_small
	arrowsmallleft    : '&#983027;',  // \0EFFF3 caret_left_small
	arrowsmallright   : '&#983028;',  // \0EFFF4 caret_right_small
	closex            : '&#983029;',  // \0EFFF5 close_x
	search            : '&#983030;',  // \0EFFF6 magnify
	rollforward       : '&#983031;',  // \0EFFF7 redo
	rollbackward      : '&#983032;',  // \0EFFF8 undo
	exitfullscreen    : '&#983033;',  // \0EFFF9 minimize
	fullscreen        : '&#983034;',  // \0EFFFA maximize
	arrowextend       : '&#983073;',  // \0F0021 arrow_left
	arrowshrink       : '&#983074;',  // \0F0022 arrow_right
	flag              : '&#983075;',  // \0F0023 flag
	funnel            : '&#983076;',  // \0F0024 filter
	trash             : '&#983077;',  // \0F0025 trash
	star              : '&#983080;',  // \0F0028 star_full
	hollowstar        : '&#983081;',  // \0F0029 star_empty
	halfstar          : '&#983082;',  // \0F002A star_half
	gear              : '&#983083;',  // \0F002B gear
	plug              : '&#983084;',  // \0F002C input
	lock              : '&#983085;'   // \0F002D lock
};

/**
* {@link module:moonstone/Icon~Icon} is a control that displays an icon image. You may specify the
* image by setting the [src]{@link module:moonstone/Icon~Icon#src} property to a URL indicating the
* image file's location.
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		Icon = require('moonstone/Icon');
*
* 	{kind: Icon, src: 'moonstone/src/assets/search.png'}
* ```
*
* Moonstone also supports a second method for displaying icons; in addition to
* using traditional image assets specified in `src`, you may use icons that are
* stored as single characters in a special symbol font. To do this, set the
* value of the [icon]{@link module:moonstone/Icon~Icon#icon} property to a string representing an
* icon name, e.g.:
*
* ```
* 	{kind: Icon, icon: 'closex'}
* ```
*
* For image-based icons, two sizes are supported: large (45x45 pixels) and small
* (32x32 pixels). Icons are small by default. To specify a large icon, set the
* [small]{@link module:moonstone/Icon~Icon#small} property to `false`:
*
* ```
* 	{kind: Icon, src: 'moonstone/src/assets/search.png', small: false}
*
* 	{kind: Icon, icon: 'closex', small: false}
* ```
*
* In addition, both icon sizes support two states: a default (resting) state,
* and a pressed (active) state. Both states need to be included in the icon's
* associated image asset, with the resting state on top and the active state on
* the bottom.
*
* Image assets for large icons should be 75px wide and 150px high. This allows
* room for the two states, along with 15 pixels of transparent padding on all
* four sides of each 45x45 icon.
*
* Assets for small icons should be 50px wide and 100px high. This allows room
* for the two states, along with 9 pixels of transparent padding on all four
* sides of each 32x32 icon.
*
* Since asset-based icon images are applied as CSS backgrounds, the height and
* width of an icon must be set if an image of a non-standard size is used.
*
* For situations in which an icon should act like a button, use
* {@link module:moonstone/IconButton~IconButton}.
*
* @class Icon
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Icon~Icon.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Icon',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	allowHtml: true,

	/**
	* @private
	* @lends module:moonstone/Icon~Icon.prototype
	*/
	published: {

		/**
		* This property serves two purposes. One, it accepts one of the below Moonstone icon
		* names. Two, it also supports standard ascii characters or HTML entities, to directly
		* represent a glyph. By default, the font used when you specify a
		* character/entity/glyph, the font "LG Display_Dingbat" will be used. It is applied via
		* a `class`: "font-lg-icons". To apply your own dingbat font, override this class's
		* `font-family` property in your CSS.
		*
		* The following icon names are valid:
		*
		* `drawer`
		* `arrowlargedown`
		* `arrowlargeup`
		* `arrowlargeleft`
		* `arrowlargeright`
		* `arrowsmallup`
		* `arrowsmalldown`
		* `arrowsmallleft`
		* `arrowsmallright`
		* `closex`
		* `check`
		* `search`
		* `exitfullscreen`
		* `fullscreen`
		* `circle`
		* `stop`
		* `play`
		* `pause`
		* `forward`
		* `backward`
		* `skipforward`
		* `skipbackward`
		* `pauseforward`
		* `pausebackward`
		* `pausejumpforward`
		* `pausejumpbackward`
		* `jumpforward`
		* `jumpbackward`
		* `arrowextend`
		* `arrowshrink`
		*
		* @type {String}
		* @default ''
		* @public
		*/
		icon: '',

		/**
		* URL specifying path to icon image.
		*
		* @type {String|module:enyo/resolution#selectSrc~src}
		* @default ''
		* @public
		*/
		src: '',

		/**
		* If `true`, icon is shown as disabled.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* A boolean parameter affecting the size of the icon.
		* If `true`, the icon will be 32px by 32px. If `false`, the icon will be 45px
		* by 45px. When `small` is `true`, a larger, invisible tap area will be applied
		* around the icon.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		small: true
	},

	/**
	* @private
	*/
	handlers: {
		/**
		* This is a horrible hack to prevent event bubble caching from messing up
		* moon.Tooltip positioning (BHV-13377). In short, we don't need to do anything
		* with onenter ourselves, but we need it to pass through us on the way to
		* moon.TooltipDecorator, which uses inSender to figure out who the tooltip
		* activator should be.
		*
		* TODO: Something better.
		*
		* @private
		*/
		onenter: 'doNothing'
	},

	/**
	* @returns {String} The value of the [src]{@link module:moonstone/Icon~Icon#src} property.
	* @public
	*/
	getSrc: function () {
		return this.src;
	},

	/**
	* @private
	*/
	classes: 'moon-icon',

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);

		this.smallChanged();
		if (this.src) {
			this.srcChanged();
		}
		this.disabledChanged();
	},

	/**
	* @private
	*/
	getIconClass: function (inIconName) {
		return 'moon-icon-' + (inIconName || this.icon);
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @private
	*/
	srcChanged: function () {
		var src = this.src || null;
		src = ri.selectSrc(src);
		if (src) {
			if (src != 'none' && src != 'inherit' && src != 'initial') {
				src = 'url(' + path.rewrite(src) + ')';
			}
		}
		this.applyStyle('background-image', src);
	},

	/**
	* @private
	*/
	iconChanged: function (old) {
		var icon = this.get('icon') || '',
			iconEntity = icons[icon] || icon;

		// If the icon isn't in our known set, apply our custom font class
		this.addRemoveClass('font-lg-icons', !icons[icon]);

		this.set('content', iconEntity);

		if (icons[old]) {
			this.removeClass(this.getIconClass(old));
		}
		if (icons[icon]) {
			this.addClass(this.getIconClass());
		}
	},

	/**
	* @private
	*/
	smallChanged: function () {
		this.addRemoveClass('small', this.small);
		// Now that our content area is ready, assign the icon
		this.iconChanged();
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['accessibilityLabel', 'accessibilityHint'], method: function () {
			var label = this.accessibilityHint && this.accessibilityLabel && (this.accessibilityLabel + ' ' + this.accessibilityHint) ||
						this.accessibilityHint ||
						this.accessibilityLabel ||
						null;
			this.setAriaAttribute('aria-label', label);
		}}
	]
});

}],'moonstone/Tooltip':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Tooltip~Tooltip} kind.
* @module moonstone/Tooltip
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	Popup = require('enyo/Popup'),
	Component = require('enyo/Component'),
	Signals = require('enyo/Signals'),
	ri = require('enyo/resolution');

var pointerTemplate = '<path d="M0,5C0,3,1,0,3,0H0V5Z"/>';

// To prevent lingering tooltips, we're monitoring spotlight changes and tooltip display
// to ensure that only 1 tooltip is active.
// see BHV-14524, ENYO-247
var observer = new Component({

	/**
	* Last active tooltip
	* @private
	*/
	active: null,

	/**
	* @private
	*/
	components: [
		{kind: Signals, onSpotlightCurrentChanged: 'spotChanged'}
	],

	/**
	* @private
	*/
	activeChanged: function (was) {
		if(was) {
			was.waterfall('onRequestHideTooltip');
		}
	},

	/**
	* @private
	*/
	spotChanged: function (sender, event) {
		this.set('active', null);
	}
});

/**
* Provides uppercasing and checks text directionality for controls within a
* {@link module:moonstone/Tooltip~Tooltip}.
*
* @class TooltipContent
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var TooltipContent = kind({
	/**
	* @private
	*/
	name: 'moon.TooltipContent',

	/**
	* @private
	*/
	kind: Control,

	/**
	* When `true`, the content will have locale-safe uppercasing applied.
	*
	* @type {Boolean}
	* @default true
	* @public
	*/
	uppercase: true,

	/**
	* @private
	*/
	create: function () {
		this._content = this.content;
		Control.prototype.create.apply(this, arguments);
	},

	/**
	* @private
	*/
	contentChanged: function (was, is) {
		if (arguments.length) this._content = is;
		this.content = this.uppercase ? util.toUpperCase(this._content) : this._content;
		Control.prototype.contentChanged.apply(this, arguments);
		this.detectTextDirectionality();
	},

	/**
	* @private
	*/
	uppercaseChanged: function (was, is) {
		this.contentChanged();
	}
});

/**
* {@link module:moonstone/Tooltip~Tooltip} is a popup that works in conjunction
* with {@link module:moonstone/TooltipDecorator~TooltipDecorator}. The tooltip
* is automatically displayed when the user hovers over the decorator for a given
* period of time. The tooltip is positioned around the decorator where there is
* available window space.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('moonstone/Button'),
* 		Tooltip = require('moonstone/Tooltip'),
* 		TooltipDecorator = require('moonstone/TooltipDecorator');
*
* 	{kind: TooltipDecorator, components: [
* 		{kind: Button, content: 'Tooltip'},
* 		{kind: Tooltip, content: 'I am a tooltip for a button.'}
* 	]}
* ```
*
* You may force the tooltip to appear by calling its
* [show()]{@link module:enyo/Control~Control#show} method.
*
* @class Tooltip
* @extends module:enyo/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Tooltip~Tooltip.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Tooltip',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	defaultKind: TooltipContent,

	/**
	* @private
	*/
	classes: 'moon-tooltip below left-arrow',

	/**
	* @private
	* @lends module:moonstone/Tooltip~Tooltip.prototype
	*/
	published: {
		/**
		* This value overrides the default value of
		* [autoDismiss]{@link module:enyo/Popup~Popup#autoDismiss} inherited from
		* {@link module:enyo/Popup~Popup}.
		* If `true`, the tooltip will hide when the user taps outside of it or presses
		* ESC. Note that this property only affects behavior when the tooltip is used
		* independently, not when it is used with
		* [TooltipDecorator]{@link module:moonstone/TooltipDecorator~TooltipDecorator}.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		autoDismiss: false,

		/**
		* This value overrides the default value of
		* [floating]{@link module:enyo/Popup~Popup#floating} inherited from
		* {@link module:enyo/Popup~Popup}.
		* If 'false', the tooltip will not be rendered in a
		* [floating layer]{@link module:enyo/Control/floatingLayer~FloatingLayer} and can be ocluded
		* by other controls. Otherwise if `true`, the tooltip will be shown on top of other controls.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		floating: true,

		/**
		* Hovering over the decorator for this length of time (in milliseconds) causes the
		* tooltip to appear.
		*
		* @type {Number}
		* @default 500
		* @public
		*/
		showDelay: 500,

		/**
		* Position of the tooltip with respect to the activating control. Valid values are
		* `'above'`, `'below'`, `'left top'`, `'left bottom'`, `'right top'`, `'right bottom'`, and
		* `'auto'`. The values starting with `'left`' and `'right'` place the tooltip on the side
		* (sideways tooltip) with two additional positions available, `'top'` and `'bottom'`, which
		* places the tooltip content toward the top or bottom, with the tooltip pointer
		* middle-aligned to the activator.
		*
		* Note: The sideways tooltip does not automatically switch sides if it gets too close or
		* overlaps with the window bounds, as this may cause undesirable layout implications,
		* covering your other controls.
		*
		* @type {String}
		* @default 'auto'
		* @public
		*/
		position: 'auto',

		/**
		* Default `margin-left` value.
		*
		* @type {Number}
		* @default 0
		* @public
		*/
		defaultLeft: 0,

		/**
		* When `true`, the content will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/Tooltip~Tooltip#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		contentUpperCase: null
	},

	/**
	* @private
	*/
	captureEvents: false,

	/**
	* @private
	*/
	handlers: {
		onRequestShowTooltip: 'requestShow',
		onRequestHideTooltip: 'requestHide'
	},

	/**
	* @private
	*/
	tools: [
		{name: 'point', kind: Control, classes: 'moon-tooltip-point', tag: 'svg', attributes: {viewBox: '0 0 3 5'}, allowHtml: true, content: pointerTemplate},
		{name: 'client', kind: Control, classes: 'moon-tooltip-label moon-header-font'}
	],

	/**
	* @private
	*/
	initComponents: function () {
		this.createChrome(this.tools);
		Popup.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	create: function () {
		Popup.prototype.create.apply(this, arguments);

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the contentUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.contentUpperCase !== null) this.uppercase = this.contentUpperCase;

		this.contentChanged();
	},

	/**
	* @private
	*/
	contentChanged: function () {
		this.detectTextDirectionality();
		var content = this.getContent();
		this.$.client.setContent( this.get('uppercase') ? util.toUpperCase(content) : content);
	},

	/**
	* @private
	*/
	uppercaseChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// contentUpperCase is fully deprecated and removed.
		if (this.contentUpperCase != this.uppercase) this.contentUpperCase = this.uppercase;
		this.contentChanged();
	},

	/**
	* @private
	*/
	contentUpperCaseChanged: function () {
		if (this.uppercase != this.contentUpperCase) this.uppercase = this.contentUpperCase;
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	positionChanged:function () {
		this.adjustPosition(true);
	},

	/**
	* @private
	*/
	requestShow: function (inSender, inEvent) {
		observer.set('active', this);
		this.activator = inEvent.originator;
		this.startJob('showJob', 'show', this.showDelay);
		return true;
	},

	/**
	* @private
	*/
	cancelShow: function () {
		this.stopJob('showJob');
	},

	/**
	* @private
	*/
	requestHide: function () {
		this.cancelShow();
		return Popup.prototype.requestHide.apply(this, arguments);
	},

	/**
	* @private
	*/
	showingChanged: function () {
		this.cancelShow();
		Popup.prototype.showingChanged.apply(this, arguments);
	},

	/**
	* @private
	*/
	applyPosition: function (inRect) {
		var s = '';
		for (var n in inRect) {
			s += (n + ':' + inRect[n] + (isNaN(inRect[n]) ? '; ' : 'px; '));
		}
		this.addStyles(s);
	},

	/**
	* @private
	*/
	adjustPosition: function (belowActivator) {
		if (this.showing && this.hasNode()) {
			var b = this.node.getBoundingClientRect(),
				moonDefaultPadding = ri.scale(18),
				defaultMargin = ri.scale(21),
				floating = this.get('floating'),
				acNode = this.activator.hasNode(),
				pBounds = this.parent.getAbsoluteBounds(),
				acBounds = this.activator.getAbsoluteBounds(),
				acBorders;

			//* Calculate the difference between decorator and activating
			//* control's top, left, right differences, position tooltip against
			//* the activating control instead of the decorator accordingly.
			var paTopDiff = pBounds.top - acBounds.top,
				paLeftDiff =  acBounds.left - pBounds.left,
				paRightDiff = pBounds.left + pBounds.width - acBounds.left - acBounds.width,
				acRight = window.innerWidth - moonDefaultPadding - acBounds.left - acBounds.width,
				rtl = this.parent.rtl,	// Must check the parent because the text may have been auto-flipped due to content's direction
				anchorLeft, anchorSide, offset;

			if (this.position == 'auto') this.position = 'above';	// Choose a rational default

			// Restore to generic state
			this.removeClass('above');
			this.removeClass('below');
			this.removeClass('top');
			this.removeClass('bottom');
			this.removeClass('left-arrow');
			this.removeClass('right-arrow');

			if (rtl) {
				anchorLeft = pBounds.left + pBounds.width / 2 - moonDefaultPadding < b.width;
			} else {
				//* When there is not enough room on the left, using right-arrow for the tooltip
				anchorLeft = window.innerWidth - moonDefaultPadding - pBounds.left - pBounds.width / 2 >= b.width;
			}

			if (floating) {
				offset = acRight + moonDefaultPadding;
			} else {
				offset = paRightDiff;
				// we need to account for activator border widths if we are not floating
				acBorders = dom.calcBoxExtents(acNode, 'border');
			}

			//* Check if have a compound position, 2 words:
			if (this.position && this.position.indexOf(' ') >= 0) {
				anchorSide = true;
				var positions = this.position.split(' '),
					lr = positions[0],	// This should be either 'left' or 'right'
					tb = positions[1],	// This should be either 'top' or 'bottom'
					relTop = 0,
					relLeft = 0;

				this.addClass(tb);

				// Calculate the absolute top coordinate
				relTop = (acBounds.height / 2);
				if (tb == 'top') {
					// We're below, alter the absTop value as necessary
					relTop -= b.height;
				}

				// detrmine the side, and if RTL, just do the opposite.
				if ((lr == 'left' && !rtl) || (lr == 'right' && rtl)) {
					this.addClass('right-arrow');
					relLeft = -(b.width + defaultMargin + (floating ? 0 : acBorders.left));
				} else if ((lr == 'right' && !rtl) || (lr == 'left' && rtl)) {
					this.addClass('left-arrow');
					relLeft = acNode.clientWidth + defaultMargin + (floating ? acBounds.width - acNode.clientWidth : acBorders.right);
				}

				if (floating) {
					// Absolute (floating) measurements are based on the relative positions
					// Adjusting as needed.
					relTop = acBounds.top + relTop;
					relLeft = acBounds.left + relLeft;
				}

				this.applyPosition({'top': dom.unit(relTop, 'rem'), 'left': dom.unit(relLeft, 'rem'), 'right': 'auto'});

			} else {
				//* When there is not enough room in the bottom, move it above the
				//* decorator; when the tooltip bottom is within window height but
				//* set programmatically above, move it above
				if ((window.innerHeight - moonDefaultPadding) - (pBounds.top + pBounds.height) < b.height + defaultMargin || (this.position == 'above')) {
					this.addClass('above');
					if (floating) {
						this.applyPosition({'top': dom.unit((acBounds.top - b.height - defaultMargin),'rem'), 'left': dom.unit(acBounds.left + acBounds.width / 2, 'rem'), 'right': 'auto'});
					} else {
						this.applyPosition({'top': dom.unit(-(b.height + defaultMargin + paTopDiff + acBorders.top), 'rem'), 'left': dom.unit(acBounds.width / 2 + paLeftDiff, 'rem'), 'right': 'auto'});
					}
				}

				//* When there is not enough space above the parent container, move
				//* it below the decorator; when there is enough space above the
				//* parent container but is set programmatically, leave it below
				if (pBounds.top < (b.height + defaultMargin) || (this.position == 'below') || this.hasClass('below')) {
					this.removeClass('above');	// Above class may have been added in the `if` check above, then need to be removed because the tooltip didn't fit on the screen.
					this.addClass('below');
					if (floating) {
						this.applyPosition({'top': dom.unit(acBounds.top + acBounds.height + defaultMargin, 'rem'), 'left': dom.unit(acBounds.left + acBounds.width / 2, 'rem'), 'right': 'auto'});
					} else {
						this.applyPosition({'top': dom.unit(this.parent.node.clientHeight + defaultMargin + paTopDiff + acBorders.bottom, 'rem'), 'left': dom.unit(acBounds.width / 2 + paLeftDiff, 'rem'), 'right': 'auto'});
					}
				}

				if (anchorLeft) {
					this.addClass('left-arrow');
				} else {
					this.addClass('right-arrow');
					this.applyPosition({'margin-left': dom.unit(- b.width, 'rem'), 'left': 'auto'});
					this.applyStyle('right', dom.unit(acBounds.width / 2 + offset, 'rem'));
				}
			}
		}
	},

	/**
	* @private
	*/
	handleResize: function () {
		this.applyPosition({'margin-left': this.defaultLeft, 'bottom': 'auto'});
		this.adjustPosition(true);
		Popup.prototype.handleResize.apply(this, arguments);
	},

	// Accessibility

	/**
	* When `true`, the contents of the popup will be read when shown.
	*
	* @default true
	* @type {Boolean}
	* @public
	*/
	accessibilityReadAll: true,

	/**
	* @private
	*/
	accessibilityLive: 'off',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['accessibilityReadAll', 'accessibilityRole', 'showing'], method: function () {
			this.startJob('alert', function () {
				this.setAriaAttribute('role', this.accessibilityReadAll && this.showing ? 'alert' : this.accessibilityRole);
			}, 100);
		}}
	]
});

module.exports.Content = TooltipContent;

}],'moonstone/RichText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/RichText~RichText} kind.
* @module moonstone/RichText
*/

var
	kind = require('enyo/kind'),
	RichText = require('enyo/RichText');

/**
* {@link module:moonstone/RichText~RichText} is a Moonstone-styled text input
* field with support for rich text formatting such as bold, italics, and
* underlining, derived from {@link module:enyo/RichText~RichText}. Typically, a
* `moonstone/RichText` is placed inside a
* {@link module:moonstone/InputDecorator~InputDecorator}, which provides
* styling, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		InputDecorator = require('moonstone/InputDecorator'),
* 		RichText = require('moonstone/RichText');
*
* 	{kind: InputDecorator, components: [
* 		{kind: RichText, style: 'width: 240px;', onchange: 'inputChange'}
* 	]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class RichText
* @extends module:enyo/RichText~RichText
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/RichText~RichText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.RichText',

	/**
	* @private
	*/
	kind: RichText,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-richtext',

	/**
	* @private
	*/
	create: function () {
		RichText.prototype.create.apply(this, arguments);
		this.disabledChanged();
	},

	/**
	* Sets the focus on the RichText.
	*
	* @public
	*/
	focus: function () {
		RichText.prototype.focus.apply(this, arguments);
		var node = this.hasNode();
		// We move the cursor to the end, because in 5-way
		// mode there is no way (other than backspacing) for
		// the user to move the caret within the text field
		this.moveCursorToEnd();
		node.scrollTop = node.scrollHeight;
	},

	/**
	* Removes focus from the RichText.
	*
	* @public
	*/
	blur: function () {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* Piggyback onto {@link module:enyo/RichText~RichText#blurHandler}.
	*
	* @private
	* @method
	*/
	blurHandler: function () {
		RichText.prototype.blurHandler.apply(this, arguments);
		this.hasNode().scrollTop = 0;
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		RichText.prototype.disabledChanged.apply(this, arguments);
		if (this.disabled) {
			this.attributes.contenteditable = false;
		}
	},

	/**
	* @private
	*/
	left: function () {
		var sel = this.getSelection();
		if (sel.rangeCount) {
			var selRange = sel.getRangeAt(0);
			var testRange = selRange.cloneRange();

			testRange.selectNodeContents(this.node);
			testRange.setEnd(selRange.startContainer, selRange.startOffset);

			if (testRange.toString() === '') {
				return false;
			}
		}
		return true;
	},

	/**
	* @private
	*/
	right: function () {
		var sel = this.getSelection();
		if (sel.rangeCount) {
			var selRange = sel.getRangeAt(0);
			var testRange = selRange.cloneRange();

			testRange.selectNodeContents(this.node);
			testRange.setStart(selRange.endContainer, selRange.endOffset);

			if (testRange.toString() === '') {
				return false;
			}
		}
		return true;
	},

	/**
	* @private
	*/
	up: function (inEvent) {
		return this.left();
	},

	/**
	* @private
	*/
	down: function (inEvent) {
		return this.right();
	}
});

}],'moonstone/TextArea':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/TextArea~TextArea} kind.
* @module moonstone/TextArea
*/

var
	kind = require('enyo/kind'),
	TextArea = require('enyo/TextArea');

/**
* {@link module:moonstone/TextArea~TextArea} is a Moonstone-styled text input
* field, derived from {@link module:enyo/TextArea~TextArea}. Typically, a
* `moonstone/TextArea` is placed inside a
* {@link module:moonstone/InputDecorator~InputDecorator}, which provides
* styling, e.g.:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		InputDecorator = require('moonstone/InputDecorator'),
* 		TextArea = require('moonstone/TextArea');
*
* 	{kind: InputDecorator, components: [
* 		{kind: TextArea, onchange: 'inputChange'}
* 	]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class TextArea
* @extends module:enyo/TextArea~TextArea
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/TextArea~TextArea.prototype */ {

	/**
	* @private
	*/
	name: 'moon.TextArea',

	/**
	* @private
	*/
	kind: TextArea,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-textarea',

	/**
	* @private
	*/
	spotlightIgnoredKeys: [13, 16777221],	// 13==Enter, 16777221==KeypadEnter

	/**
	* @private
	*/
	handlers: {
		onblur: 'blurred'
	},

	/**
	* Sets the focus on the TextArea.
	*
	* @public
	*/
	focus: function () {
		TextArea.prototype.focus.apply(this, arguments);
		var node = this.hasNode();
		// We move the cursor to the end, because in 5-way
		// mode there is no way (other than backspacing) for
		// the user to move the caret within the text field
		node.selectionStart = this.value.length;
		node.scrollTop = node.scrollHeight;
	},

	/**
	* Removes focus from the TextArea.
	*
	* @public
	*/
	blur: function () {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* @private
	*/
	blurred: function () {
		this.hasNode().scrollTop = 0;
	},

	/**
	* @private
	*/
	left: function (inEvent) {
		if (!this.hasNode() || this.node.selectionStart === 0) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	right: function (inEvent) {
		if (!this.hasNode() || this.node.selectionStart == this.node.value.length) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	up: function (inEvent) {
		return this.left(inEvent);
	},

	/**
	* @private
	*/
	down: function (inEvent) {
		return this.right(inEvent);
	}
});

}],'moonstone/HighlightText':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/HighlightText~HighlightText} kind.
* @module moonstone/HighlightText
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	Control = require('enyo/Control'),
	HTMLStringDelegate = require('enyo/HTMLStringDelegate');

/**
* Event sent to {@link module:moonstone/HighlightText~HighlightText} to turn on highlighting.
*
* @event module:moonstone/HighlightText~HighlightText#onHighlight
* @type {Object}
* @property {String|RegExp} highlight - String or regular expression specifying the text or
*	pattern to highlight.
* @public
*/

/**
* Event sent to {@link module:moonstone/HighlightText~HighlightText} to turn off highlighting. No additional data
* is sent with this event.
*
* @event module:moonstone/HighlightText~HighlightText#onUnHighlight
* @type {Object}
* @public
*/

var HighlightTextDelegate = Object.create(HTMLStringDelegate);

HighlightTextDelegate.generateInnerHtml = function (control) {
	var i = 0, child;
	// flow can alter the way that html content is rendered inside
	// the container regardless of whether there are children.
	control.flow();
	if (control.children.length) {
		// If marqueeText is created inside of highlightText then it needs to pass search keyword to children
		for (; (child = control.children[i]); ++i) {
			child.search = control.search;
			child.highlightClasses = control.highlightClasses; // this is not included in search, so passing it
		}
		return this.generateChildHtml(control);
	}
	else {
		if (control.search && control.content) {
			return control.content.replace(control.search, control.bindSafely(function (s) {
				return '<span style=\'pointer-events:none;\' class=\'' + this.highlightClasses + '\'>' + dom.escape(s) + '</span>';
			}));
		} else {
			return dom.escape(control.get('content'));
		}
	}
};

/**
* {@link module:moonstone/HighlightText~HighlightText} is a control that displays highlighted text.  When
* the [highlight]{@link module:moonstone/HighlightText~HighlightText#highlight} property is set or an
* [onHighlight]{@link module:moonstone/HighlightText~HighlightText#onHighlight} event is received,
* it will highlight a specified string if that string is found within the
* control's content.
*
* For example, let's say we have the following control:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		HighlightText = require('moonstone/HighlightText');
*
* 	{kind: HighlightText, name: 'myHT', content: 'Hello World!'}
* ```
* In response to the event
*
* ```
* 	this.waterfall('onHighlight', {highlight: 'Hello'});
* ```
* or the direct API call
*
* ```
* 	this.$.myHT.set('highlight', 'Hello');
* ```
*
* the word "Hello" will be highlighted.
*
* The highlighting will be turned off when an
* [onUnHighlight]{@link module:moonstone/HighlightText~HighlightText#onUnHighlight} event is received
*
* ```
* 	this.waterfall('onUnHighlight');
* ```
* or when [highlight]{@link module:moonstone/HighlightText~HighlightText#highlight} is set to a **falsy** value.
*
* ```
* 	this.$.myHT.set('highlight', '');
* ```
*
* @class HighlightText
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/HighlightText~HighlightText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.HighlightText',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/HighlightText~HighlightText.prototype
	*/
	published: {

		/**
		* String or regular expression specifying the text or pattern to highlight.
		* Setting this to an empty string, a **falsy** value, or an empty regex
		* will disable highlighting.
		*
		* @type {String|RegExp}
		* @default ''
		* @public
		*/
		highlight: '',

		/**
		* If `true`, only case-sensitive matches of the string to highlight will be
		* highlighted.  This property will be ignored if the
		* [highlight]{@link module:moonstone/HighlightText~HighlightText#highlight} property is set to a regular
		* expression (you may use the `'i'` modifier to create a case-insensitive regex).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		caseSensitive: false,

		/**
		* The default CSS class to apply to highlighted content.
		*
		* @type {String}
		* @default 'moon-highlight-text-highlighted'
		* @public
		*/
		highlightClasses: 'moon-highlight-text-highlighted'
	},

	/**
	* @private
	*/
	renderDelegate: HighlightTextDelegate,

	/**
	* @private
	*/
	handlers: {
		onHighlight: 'onHighlightHandler',
		onUnHighlight: 'unHighlightHandler'
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.highlightChanged();
	},

	/**
	* @private
	*/
	highlightChanged: function () {
		if (this.highlight) {
			if (this.highlight instanceof RegExp) {
				// Make sure the regex isn't empty
				this.search = (''.match(this.highlight)) ? null : this.highlight;
			} else {
				// Escape string for use in regex (standard regex escape from google)
				var escaped = this.highlight.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
				this.search = new RegExp(escaped, this.caseSensitive ? 'g' : 'ig');
			}
		} else {
			this.search = false;
		}
		if (this.hasNode()) {
			this.contentChanged();
		}
	},

	/**
	* @private
	*/
	caseSensitiveChanged: function () {
		this.highlightChanged();
	},

	/**
	* @private
	*/
	onHighlightHandler: function (inSender, inEvent) {
		this.setHighlight(inEvent.highlight);
		return true;
	},

	/**
	* @private
	*/
	unHighlightHandler: function (inSender, inEvent) {
		this.setHighlight('');
		return true;
	}
});

}],'moonstone/Input':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Input~Input} kind.
* @module moonstone/Input
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Input = require('enyo/Input');

var
	Spotlight = require('spotlight');

/**
* {@link module:moonstone/Input~Input} is a Moonstone-styled input control, derived from
* {@link module:enyo/Input~Input}. Typically, a `moonstone/Input` is placed inside a
* {@link module:moonstone/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('moonstone/Input'),
* 		InputDecorator = require('moonstone/InputDecorator');
*
* 	{kind: InputDecorator, components: [
* 		{kind: Input, placeholder: 'Enter some text...', onchange: 'inputChange'}
* 	]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class Input
* @extends module:enyo/Input~Input
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Input~Input.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Input',

	/**
	* @private
	*/
	kind: Input,

	/**
	* @private
	*/
	classes: 'moon-body-text moon-input',

	/**
	* 13==Enter, 16777221==KeypadEnter
	*
	* @private
	*/
	spotlightIgnoredKeys: [13, 16777221],

	/**
	* @private
	* @lends module:moonstone/Input~Input.prototype
	*/
	published: {

		/**
		* When `true`, input blurs on Enter keypress (if focused).
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		dismissOnEnter: false
	},

	/**
	* @private
	*/
	handlers: {
		onkeyup    : 'onKeyUp',
		onblur     : 'onBlur',
		onfocus    : 'onFocus'
	},

	/**
	* Used only for [dismissOnEnter]{@link module:moonstone/Input~Input#dismissOnEnter} feature;
	* we cannot rely on `hasFocus()` in this case due to race condition.
	*
	* @private
	*/
	_bFocused: false,

	/**
	* @private
	*/
	onFocus: function () {
		var node = this.hasNode();

		if (this.dismissOnEnter) {
			var oThis = this;
			util.asyncMethod(this, function () {oThis._bFocused = true;});
		}
		// Force cursor to end of text during a generic focus event. Creating the input by compiling
		// a string of text with value="this.value" produces different initial caret position than
		// using node.setAttribute('value', this.value), which is what would happen any time after
		// the initial creation. The initial end-position of the caret is required to support
		// Virtual keyboards because without arrow-keys because normal left/right arrow navigation
		// in inputs is impossible, so the caret must be positioned at the end to allow for deletion
		// of the previous input. We are intentionally setting the value to force the cursor to the
		// end of the text. `selectionStart` is the obvious choice, but it is not supported in
		// certain types of fields (i.e. number, email).
		if (node) node.value = this.get('value');
	},

	/**
	* @private
	*/
	onBlur: function () {
		if (this.dismissOnEnter) {
			this._bFocused = false;
		}
	},

	/**
	* @private
	*/
	onKeyUp: function (oSender, oEvent) {
		if (this.dismissOnEnter) {
			if (oEvent.keyCode == 13 && this._bFocused) {
				this.blur();
				if (Spotlight.getPointerMode()) {
					Spotlight.unspot();
				}
			}
		}
	},

	/**
	* @private
	*/
	blur: function () {
		if (this.hasNode()) {
			this.node.blur();
		}
	},

	/**
	* @private
	*/
	left: function () {
		if (!this.hasNode() || this.node.selectionStart === 0) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	right: function () {
		if (!this.hasNode() || this.node.selectionStart == this.node.value.length) {
			return false;
		}
		return true;
	},

	/**
	* @private
	*/
	up: function () {
		return false;
	},

	/**
	* @private
	*/
	down: function () {
		return false;
	}
});

}],'moonstone/IconButton':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/IconButton~IconButton} kind.
* @module moonstone/IconButton
*/

var
	kind = require('enyo/kind');

var
	Icon = require('../Icon');

/**
* {@link module:moonstone/IconButton~IconButton} is a {@link module:moonstone/Icon~Icon} that acts like a button. Specify
* the icon image by setting the [src]{@link module:moonstone/Icon~Icon#src} property to a URL
* indicating the image file's location.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		IconButton = require('moonstone/IconButton');
*
* 	{kind: IconButton, src: 'moonstone/src/assets/search.png'}
* ```
*
* If you want to combine an icon with text inside of a button, use a
* {@link module:moonstone/Icon~Icon} inside a
* {@link module:moonstone/Button~Button}.
*
* Moonstone supports two methods for displaying icons; in addition to specifying
* traditional image assets in `src`, you may use icons that are stored as single
* characters in a special symbol font. To do this, set the value of the
* [icon]{@link module:moonstone/Icon~Icon#icon} property to a string representing
* an icon name, e.g.:
*
* ```javascript
* 	{kind: IconButton, icon: 'closex'}
* ```
*
* See {@link module:moonstone/Icon~Icon} for more information on the available font-based icons,
* as well as specifications for icon image assets.
*
* @class IconButton
* @extends module:moonstone/Icon~Icon
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/IconButton~IconButton.prototype */ {

	/**
	* @private
	*/
	name: 'moon.IconButton',

	/**
	* @private
	*/
	kind: Icon,

	/**
	* @private
	* @lends module:moonstone/IconButton~IconButton.prototype
	*/
	published: {

		/**
		* Used when the IconButton is part of an {@link module:enyo/Group~Group}. A value of `true`
		* indicates that this is the active button of the group; `false`, that it is not
		* the active button.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* A boolean parameter affecting the size of the button.
		* If `true`, the button will have a diameter of 60px.
		* However, the button's tap target will still have a diameter of 78px, with
		* invisible DOM wrapping the small button to provide the larger tap zone.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		small: true,

		/**
		* @deprecated Replaced by [backgroundOpacity]{@link module:moonstone/IconButton~IconButton#backgroundOpacity}.
		*
		* If `true`, the button will have no rounded background color/border.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		noBackground: false,

		/**
		* The background-color opacity of this button; valid values are `'opaque'`, `'translucent'`,
		* and `'transparent'`.
		*
		* @type {String}
		* @default opaque
		* @public
		*/
		backgroundOpacity: 'opaque'
	},

	/**
	* @private
	*/
	classes: 'moon-icon-button',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	handlers: {

		/**
		* Simulates mousedown.
		*/
		onSpotlightKeyDown: 'depress',

		/**
		* Simulates mouseup.
		*/
		onSpotlightKeyUp: 'undepress',

		/**
		* Used to request it is in view in scrollers.
		*/
		onSpotlightFocused: 'spotlightFocused',

		onSpotlightBlur: 'spotlightBlurred'
	},

	/**
	* @private
	*/
	create: function () {
		Icon.prototype.create.apply(this, arguments);
		if (this.noBackground) {
			this.noBackgroundChanged();
		}
		this.backgroundOpacityChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Icon.prototype.rendered.apply(this, arguments);
		this.activeChanged();
	},

	/**
	* @private
	*/
	noBackgroundChanged: function () {
		this.set('backgroundOpacity', this.noBackground ? 'transparent' : 'opaque');
	},

	/**
	* @private
	*/
	tap: function () {
		if (this.disabled) {
			return true;
		}
		this.setActive(true);
	},

	/**
	* @fires module:enyo/GroupItem~GroupItem#onActivate
	* @private
	*/
	activeChanged: function () {
		this.bubble('onActivate');
	},

	/**
	* Adds `pressed` CSS class.
	* @private
	*/
	depress: function (inSender, inEvent) {
		if (inEvent.keyCode === 13) {
			this.addClass('pressed');
		}
	},

	/**
	* Removes `pressed` CSS class.
	* @private
	*/
	undepress: function () {
		this.removeClass('pressed');
	},

	/**
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	spotlightFocused: function (inSender, inEvent) {
		if (inEvent.originator === this) {
			this.bubble('onRequestScrollIntoView');
		}
	},

	/**
	* @private
	*/
	spotlightBlurred: function (sender, event) {
		this.removeClass('pressed');
	},

	/**
	* @private
	*/
	backgroundOpacityChanged: function (old) {
		var opacity = this.backgroundOpacity;
		if (old) this.removeClass(old);
		if (opacity == 'translucent' || opacity == 'transparent') {
			this.addClass(opacity);
		}
	},

	// Accessibility

	/**
	* @default 'button'
	* @type {String}
	* @see {@link module:enyo/AccessibilitySupport~AccessibilitySupport#accessibilityRole}
	* @public
	*/
	accessibilityRole: 'button'
});

},{'../Icon':'moonstone/Icon'}],'moonstone/Marquee':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Marquee~MarqueeSupport} mixin and the {@link module:moonstone/Marquee~MarqueeText} &
* {@link module:moonstone/Marquee~MarqueeDecorator} kinds.
* @module moonstone/Marquee
*/

var kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	platform = require('enyo/platform'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	Component = require('enyo/Component'),
	Signals = require('enyo/Signals');

var
	options = require('../options'),
	HighlightText = require('../HighlightText');

var exports = module.exports = {};

/**
* There are a couple scenarios (window blurs and changing from pointer mode to 5-way) in which
* we'd like to stop an actively on-hover marqueeing control. This private instance manages
* those events centrally to minimize unnecessary Signal's subscribers.
*
* @private
*/
var observer = new Component({

	/**
	* @private
	*/
	hoverControl: null,

	/**
	* @private
	*/
	components: [
		{kind: Signals, onSpotlightModeChanged: 'handleModeChanged', onblur: 'handleBlur'}
	],

	/**
	* @private
	*/
	_setMarqueeOnHoverControl: function(oControl) {
		this.hoverControl = oControl;
	},

	/**
	* @private
	*/
	_getMarqueeOnHoverControl: function() {
		return this.hoverControl;
	},

	/**
	* @private
	*/
	handleModeChanged: function (sender, event) {
		if (!event.pointerMode && this.hoverControl) {
			this.hoverControl._marquee_leave();
		}
	},

	/**
	* @private
	*/
	handleBlur: function (sender, event) {
		if (this.hoverControl) {
			this.hoverControl._marquee_leave();
		}
	}
});

/**
* Fires to queue up a list of child animations.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarquee
* @type {Object}
* @property {Object} originator - A reference to the originator of this event.
* @property {Boolean} marqueePause - The desired duration in milliseconds that the
* marquee will pause at the end of the animation, before resetting to the beginning.
* @property {Number} marqueeSpeed - The desired speed for the marquee animation,
* in pixels per second.
* @private
*/

/**
* Fires to start marquee animation in a child marquee.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStart
* @type {Object}
* @property {Object} originator - A reference to the originator of this event.
* @private
*/

/**
* Fires to halt marquee animation in a child marquee.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStop
* @type {Object}
* @property {Object} originator - A reference to the originator of this event.
* @private
*/

/**
* Fires to enable animation in a child marquee. No additional data is sent with this event.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeEnable
* @type {Object}
* @private
*/

/**
* Fires to disable animation in a child marquee. No additional data is sent with this event.
*
* @event module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeDisable
* @type {Object}
* @private
*/

/**
* Fires when marquee ends. No additional data is sent with this event.
*
* @event module:moonstone/Marquee~MarqueeItem#onMarqueeEnded
* @type {Object}
* @private
*/

/**
* The {@link module:moonstone/Marquee~MarqueeSupport} [mixin]{@glossary mixin} should be used with controls
* that contain multiple marquees whose animation behavior should be synchronized. Calling
* [this.startMarquee()]{@link module:moonstone/Marquee~MarqueeSupport#startMarquee} or
* [this.stopMarquee()]{@link module:moonstone/Marquee~MarqueeSupport#stopMarquee} will start or stop all
* contained marquees.
*
* The following properties, defined on the base kind to which the mixin is applied,
* control the marquee behavior:
*
* [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight}: When `true`, marquee
* starts when control is spotlight focused and ends when it is spotlight blurred.
*
* [marqueeOnHover]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnHover}: When `true`, marquee runs
* while control is hovered over with the mouse. This property is ignored if
* `marqueeOnSpotlight` is `true`.
*
* [marqueeOnRender]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRender}: When `true`, marquee starts
* running as soon as control is rendered, and runs continuously.
*
* [marqueeSpeed]{@link module:moonstone/Marquee~MarqueeSupport#marqueeSpeed}: The speed of the marquee animation,
* in pixels per second.
*
* [marqueeDelay]{@link module:moonstone/Marquee~MarqueeSupport#marqueeDelay}: The delay between spotlight
* focus/hover and the start of the animation. (This is only used when either
* `marqueeOnSpotlight` or `marqueeOnHover` is `true`).
*
* [marqueeOnRenderDelay]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRenderDelay}: Used when you want
* the marquee to run on render, after a specified delay.
*
* [marqueePause]{@link module:moonstone/Marquee~MarqueeSupport#marqueePause}: The duration in milliseconds that
* the marquee will pause at the end of the animation, before resetting to the beginning.
*
* @mixin
* @public
*/
var MarqueeSupport = {

	/**
	* @private
	*/
	name: 'MarqueeSupport',

	/**
	* @private
	*/
	_marquee_Handlers: {
		onRequestStartMarquee: '_marquee_requestStartMarquee',
		onSpotlightFocused: '_marquee_spotlightFocused',
		onSpotlightBlur: '_marquee_spotlightBlur',
		onenter: '_marquee_enter',
		onleave: '_marquee_leave',
		onMarqueeEnded: '_marquee_marqueeEnded',
		onresize: '_marquee_resize',

		// Stop propagation of requests coming from parent MarqueeSupport's, since
		// only this MarqueeSupport should be controlling its subordinate children
		onRequestMarquee: '_marquee_stopPropagation',
		onRequestMarqueeStart: '_marquee_stopPropagation',
		onRequestMarqueeStop: '_marquee_stopPropagation'
	},

	/**
	* @private
	*/
	_marquee_active: false,

	/**
	* When `true`, marquee starts when the control is {@link Spotlight} focused and ends
	* when it is spotlight blurred.
	*
	* @type {Boolean}
	* @default undefined
	* @public
	*/
	marqueeOnSpotlight: undefined,

	/**
	* When `true`, marquee runs while the control is hovered over with the mouse. This
	* property is ignored if [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight}
	* is `true`.
	*
	* @type {Boolean}
	* @default undefined
	* @public
	*/
	marqueeOnHover: undefined,

	/**
	* When `true`, marquee starts running as soon as the control is rendered, and runs
	* continuously.
	*
	* @type {Boolean}
	* @default undefined
	* @public
	*/
	marqueeOnRender: undefined,

	/**
	* The speed of the marquee animation, in pixels per second.
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueeSpeed: undefined,

	/**
	* The delay between spotlight focus/hover and the start of the animation. (This is only
	* used when either [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight} or
	* [marqueeOnHover]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnHover} is `true`.)
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueeDelay: undefined,

	/**
	* Used when you want the marquee to run on render, after a specified delay.
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueeOnRenderDelay: undefined,

	/**
	* The duration in milliseconds that the marquee will pause at the end of the
	* animation, before resetting to the beginning.
	*
	* @type {Number}
	* @default undefined
	* @public
	*/
	marqueePause: undefined,

	/**
	* Initializes marquee timings.
	*
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.marqueeOnSpotlight = (this.marqueeOnSpotlight === undefined) ? true : this.marqueeOnSpotlight;
			this.marqueeOnHover =  (this.marqueeOnHover ===   undefined) ? false :  this.marqueeOnHover;
			this.marqueeSpeed =    (this.marqueeSpeed ===     undefined) ? 60 :    this.marqueeSpeed;
			this.marqueeDelay =    (this.marqueeDelay ===     undefined) ? 1000 :  this.marqueeDelay;
			this.marqueePause =    (this.marqueePause ===     undefined) ? 1000 :  this.marqueePause;
			this.marqueeHold  =    (this.marqueeHold  ===     undefined) ? 2000 :  this.marqueeHold;
			this.marqueeOnRender = (this.marqueeOnRender  === undefined) ? false : this.marqueeOnRender;
			this.marqueeOnRenderDelay = (this.marqueeOnRenderDelay === undefined) ? this.marqueeDelay : this.marqueeOnRenderDelay;
		};
	}),

	/**
	* If {@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRender} is `true`, kicks off marquee animation.
	*
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			if (this.marqueeOnRender && !this.disabled) {
				this.startMarqueeCustomDelay(this.marqueeOnRenderDelay);
			}
		};
	}),

	/**
	* @method
	* @private
	*/
	teardownRender: kind.inherit(function (sup) {
		return function (caching) {
			if (caching && this._marquee_active) {
				this.stopMarquee();
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	destroy: kind.inherit(function (sup) {
		return function () {
			if (this === observer._getMarqueeOnHoverControl()) {
				observer._setMarqueeOnHoverControl(null);
			}
			sup.apply(this, arguments);
		};
	}),

	/**
	* @method
	* @private
	*/
	dispatchEvent: kind.inherit(function (sup) {
		return function (sEventName, oEvent, oSender) {
			// Needed for proper onenter/onleave handling
			if (this.strictlyInternalEvents[sEventName] && this.isInternalEvent(oEvent)) {
				return true;
			}
			// FIXME: not sure why events can arrive without event objects, but we guard here for safety
			if (oEvent && !oEvent.delegate) {
				var handler = this._marquee_Handlers[sEventName];
				if (handler){
					this.cachePoint = true;
					if(this[handler](oSender, oEvent)) {
						return true;
					}
				}
			}
			return sup.apply(this, arguments);
		};
	}),

	/**
	* Handles external requests to kick off {@link module:moonstone/Marquee~MarqueeSupport#marqueeStart}.
	*
	* @private
	*/
	_marquee_requestStartMarquee: function () {
		if (this.marqueeOnRender) {
			this.stopMarquee();
			this.startMarquee();
			return true;
		}
	},

	/**
	* On focus, starts child marquees.
	*
	* @private
	*/
	_marquee_spotlightFocused: function (sender, ev) {
		this._marquee_isFocused = true;
		if (this.marqueeOnSpotlight) {
			this.startMarquee();
		}
	},

	/**
	* On blur, halts child marquees.
	*
	* @private
	*/
	_marquee_spotlightBlur: function (sender, ev) {
		this._marquee_isFocused = false;
		if (this.marqueeOnSpotlight && !this.marqueeOnRender) {
			this.stopMarquee();
		}
	},

	/**
	* @private
	*/
	_marquee_enter: function (sender, ev) {
		this._marquee_isHovered = true;
		if ((this.marqueeOnHover && !this.marqueeOnSpotlight) ||
		(this.disabled && this.marqueeOnSpotlight)) {
			if (this.marqueeOnHover) {
				observer._setMarqueeOnHoverControl(this);
			}
			this.startMarquee();
		}
	},

	/**
	* @private
	*/
	_marquee_leave: function (sender, ev) {
		this._marquee_isHovered = false;
		if ((this.marqueeOnHover && !this.marqueeOnSpotlight) || (this.disabled && this.marqueeOnSpotlight)) {
			if (this.marqueeOnHover) {
				observer._setMarqueeOnHoverControl(null);
			}
			if (!this.marqueeOnRender) {
				this.stopMarquee();
			}
		}
	},

	/**
	* @private
	*/
	_marquee_stopPropagation: function (sender, ev) {
		if (ev.originator != this) {
			return true;
		}
	},

	/**
	* When a child marquee animation completes, removes the child from
	* [marqueeWaitList]{@link module:moonstone/Marquee~MarqueeSupport#marqueeWaitList}.
	*
	* @private
	*/
	_marquee_marqueeEnded: function (sender, ev) {
		if (this._marquee_active) {
			util.remove(ev.originator, this.marqueeWaitList);
			if (this.marqueeWaitList.length === 0) {
				this._marquee_startHold();
				this._marquee_active = false;
			}
		}
		return true;
	},

	/**
	* @private
	*/
	_marquee_resize: function (sender, ev) {
		if (this.marqueeOnSpotlight && this._marquee_active) {
			this._marquee_active = false;
			this._marquee_startHold();
		}
	},

	/**
	* Starts timer to waterfall an
	* [onRequestMarqueeStart]{@link module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStart} event
	* that kicks off marquee animation on all child marquees.
	*
	* @public
	*/
	startMarquee: function () {
		this.startMarqueeCustomDelay(this.marqueeDelay);
	},

	/**
	* Waterfalls an [onRequestMarqueeStop]{@link module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStop}
	* event to halt all running child marquees.
	*
	* @public
	*/
	stopMarquee: function () {
		this.stopJob('marqueeSupportJob');
		this.stopJob('resetMarquee');
		this._marquee_active = false;
		this._marquee_stopChildMarquees();
	},

	/**
	* @public
	*/
	enableMarquee: function () {
		this._marquee_enableChildMarquees();
	},

	/**
	* @public
	*/
	disableMarquee: function () {
		this.stopMarquee();
		this._marquee_disableChildMarquees();
	},

	/**
	* Adds the passed-in [control]{@link module:enyo/Control~Control} to the list of marquee items.
	*
	* @param {Object} control  The [control]{@link module:enyo/Control~Control} to add.
	* @public
	*/
	addMarqueeItem: function (control) {
		this.marqueeWaitList.push(control);
	},

	/**
	* Restarts marquee if needed (depending on the
	* [marqueeOnSpotlight]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnSpotlight} and
	* [marqueeOnRender]{@link module:moonstone/Marquee~MarqueeSupport#marqueeOnRender} settings).
	*
	* @public
	*/
	resetMarquee: function () {
		if ((this.marqueeOnSpotlight && this._marquee_isFocused) ||
			(this.marqueeOnHover && this._marquee_isHovered) ||
			this.marqueeOnRender) {
			// Batch multiple requests to reset from children being hidden/shown
			this.startJob('resetMarquee', '_resetMarquee', 10);
		}
	},

	/**
	* Starts Marquee after a specified delay. Used to provide different delays for `onRender`
	* and `onSpotlight/Hover`.
	*
	* @param {Number} delay  Length of delay in milliseconds
	* @public
	*/
	startMarqueeCustomDelay: function (delay) {
		this._marquee_buildWaitList();

		if (this.marqueeWaitList.length === 0) {
			return;
		}

		this._marquee_active = true;
		this.startJob('marqueeSupportJob', '_marquee_startChildMarquees', delay);
	},

	/**
	* Stops and restarts the marquee animations.
	*
	* @private
	*/
	_resetMarquee: function () {
		this.stopMarquee();
		if (this.marqueeOnRender) { this.startMarqueeCustomDelay(this.marqueeOnRenderDelay); }
		else { this.startMarquee(); }
	},

	/**
	* Waterfalls request for child animations to build up
	* [marqueeWaitList]{@link module:moonstone/Marquee~MarqueeSupport#marqueeWaitList}.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarquee
	* @private
	*/
	_marquee_buildWaitList: function () {
		this.marqueeWaitList = [];
		this.waterfall('onRequestMarquee', {originator: this, marqueePause: this.marqueePause, marqueeSpeed: this.marqueeSpeed});
	},

	/**
	* Waterfalls event to kick off child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStart
	* @private
	*/
	_marquee_startChildMarquees: function () {
		this.waterfall('onRequestMarqueeStart', {originator: this});
	},

	/**
	* Waterfalls event to halt child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeStop
	* @private
	*/
	_marquee_stopChildMarquees: function () {
		this.waterfall('onRequestMarqueeStop', {originator: this});
	},

	/**
	* Waterfalls event to enable child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeEnable
	* @private
	*/
	_marquee_enableChildMarquees: function () {
		this.waterfall('onRequestMarqueeEnable');
	},

	/**
	* Waterfalls event to disable child marquee animations.
	*
	* @fires module:moonstone/Marquee~MarqueeSupport#onRequestMarqueeDisable
	* @private
	*/
	_marquee_disableChildMarquees: function () {
		this.waterfall('onRequestMarqueeDisable');
	},

	/**
	* Begins delayed restart of child marquee animations.
	*
	* @private
	*/
	_marquee_startHold: function () {
		this.startJob('marqueeSupportJob', 'startMarquee', this.marqueeHold);
	}
};

exports.Support = MarqueeSupport;

/**
* The {@link module:moonstone/Marquee~MarqueeItem} mixin is used to add marquee animation functionality
* to a control.
*
* @mixin
* @public
*/
var MarqueeItem = {

	/**
	* @private
	*/
	events: {

		/**
		* {@link module:moonstone/Marquee~MarqueeItem#onMarqueeEnded}
		*/
		onMarqueeEnded:''
	},

	/**
	* @private
	*/
	_marqueeItem_Handlers: {
		onRequestMarquee: '_marquee_requestMarquee',
		onRequestMarqueeStart: '_marquee_startAnimation',
		onRequestMarqueeStop: '_marquee_stopAnimation',
		onRequestMarqueeEnable: '_marquee_enable',
		onRequestMarqueeDisable: '_marquee_disable',
		ontransitionend: '_marquee_animationEnded'
	},

	/**
	* @private
	*/
	observers: {
		_marquee_contentChanged: ['content'],
		_marquee_centeredChanged: ['centered'],
		_marquee_wrapInsteadOfMarqueeChanged: ['wrapInsteadOfMarquee']
	},

	/**
	* @private
	*/
	bindings: [
		{from: '.allowHtml', to:'.$.marqueeText.allowHtml'}
	],

	/**
	* @private
	*/
	classes: 'moon-marquee',

	/**
	* @method
	* @private
	*/
	dispatchEvent: kind.inherit(function (sup) {
		return function (sEventName, oEvent, oSender) {
			if (sup.apply(this, arguments)) {
				return true;
			}
			if (oEvent && !oEvent.delegate) {
				var handler = this._marqueeItem_Handlers[sEventName];
				if (handler && this[handler](oSender, oEvent)) {
					return true;
				}
			}
		};
	}),

	/**
	* @private
	*/
	_marquee_enabled: true,

	/**
	* @private
	*/
	_marquee_distance: null,

	/**
	* @private
	*/
	_marquee_fits: null,

	/**
	* @private
	*/
	_marquee_puppetMaster: null,

	/**
	* @method
	* @private
	*/
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.detectTextDirectionality();
			this._marquee_wrapInsteadOfMarqueeChanged();
		};
	}),

	/**
	* @method
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			// There is a known issue where a parent control that modifies the layout will
			// invalidate the measurements used to detect the proper alignment, which can
			// result in the appropriate text-align rule not being applied. For example, this
			// can occur with a moon.Header that is located inside a moon.Scroller which has
			// vertical scrollbars visible.
			this._marquee_detectAlignment();
			setTimeout(util.bindSafely(this, this._marquee_calcDistance), platform.firefox ? 100 : 16);
		};
	}),

	/**
	* @method
	* @private
	*/
	reflow: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this._marquee_invalidateMetrics();
			this._marquee_calcDistance();
		};
	}),

	/**
	* @method
	* @private
	*/
	showingChangedHandler: kind.inherit(function (sup) {
		return function (sender, event) {
			sup.apply(this, arguments);
			this._marquee_reset();
			if(this.showing && event.showing){
				this._marquee_calcDistance();
			} else {
				//if the marquee isn't showing we should reset its spotlight focus
				if (this._marquee_puppetMaster) {
					this._marquee_puppetMaster._marquee_spotlightBlur();
				} else if (this._marquee_spotlightBlur) {
					this._marquee_spotlightBlur();
				}
			}
		};
	}),

	/**
	* We must measure the content (after render) to determine if it's marqueeable, then to set
	* its alignment to left if the content was explicitly set to LTR earlier. This happens when
	* the locale is set to a RTL language, but your string contains no RTL characters in it.
	* Therefore it's LTR, and if it's marqueeable, should be left aligned, so it marquees in the
	* natural marqueeing direction.
	*
	* @param {Boolean} [forceAnimate]  Override the animation check (only accepts `true`). Use
	*	this if you know already, because you've already measured that you will need to marquee.
	* @param {Boolean} [forceRtl]  Override the internal RTL property, in case you know better.
	* @private
	*/
	_marquee_detectAlignment: function (forceAnimate, forceRtl) {
		var alignment = null,
			rtl = forceRtl || this.rtl;

		// We only attempt to set the alignment of this control if the locale's directionality
		// differs from the directionality of our current marqueeable control (as determined by
		// the control's content or is explicitly specified).
		if (Control.prototype.rtl != rtl || this.centered) {
			// If we will be marqueeing, we know the alignment needs to be set based on directionality.
			if (forceAnimate || this._marquee_shouldAnimate()) {
				if (rtl) {
					alignment = 'right';
				} else {
					alignment = 'left';
				}
			}
			// Alignment wasn't set yet, so we know we don't need to animate. Now we can center the text if we're supposed to.
			if (!alignment && this.centered) {
				alignment = 'center';
			}
		}

		this.set('_marquee_alignment', alignment);
	},

	/**
	* Reset the marquee distance if the alignment changes, since now we'll have to calculate the
	* size again.
	*
	* @private
	*/
	_marquee_alignmentChanged: function () {
		this.applyStyle('text-align', this._marquee_alignment);
		this._marquee_invalidateMetrics();
	},

	/**
	* @private
	*/
	_marquee_invalidateMetrics: function () {
		this._marquee_distance = null;
		this._marquee_fits = null;
	},

	/**
	* When the content of this control changes, updates the content of
	* `this.$.marqueeText` (if it exists).
	*
	* @private
	*/
	_marquee_contentChanged: function () {
		this.detectTextDirectionality();
		if (this.$.marqueeText) {
			this.$.marqueeText.setContent(this.content);
		}
		if (this.generated) {
			this._marquee_invalidateMetrics();
			this._marquee_detectAlignment();
			this._marquee_calcDistance();
		}
		this._marquee_reset();
	},

	/**
	* If this control needs to marquee, lets the event originator know.
	*
	* @private
	*/
	_marquee_requestMarquee: function (sender, ev) {
		if (!ev || !this.showing || this._marquee_fits) {
			return;
		}

		this._marquee_puppetMaster = ev.originator;
		ev.originator.addMarqueeItem(this);

		this.marqueePause = ev.marqueePause || 1000;
		this.marqueeSpeed = ev.marqueeSpeed || 60;
	},

	/**
	* Starts marquee animation.
	*
	* @private
	*/
	_marquee_startAnimation: function (sender, ev) {
		var distance;

		// if this control hasn't been generated, there's no need to follow through on
		// marquee requests as we'll be unable to correctly measure the distance delta yet
		if (!this.generated) return;

		// Lazy creation of _this.$.marqueeText_
		if (!this.$.marqueeText) {
			this._marquee_createMarquee();
		}

		distance = this._marquee_calcDistance();

		// If there is no need to animate, return early
		if (!this._marquee_shouldAnimate(distance)) {
			this._marquee_fits = true;
			this.doMarqueeEnded();
			return;
		}

		this._marquee_addAnimationStyles(distance);

		if (this.$.marqueeText) { return true; }
		//if we should animate marquee (distance > 0) but can`t do this
		//(this.$.marqueeText == undefined (marquee has children)) we fire doMarqueeEnded
		//to remove marquee from marquee wait list
		else { this.doMarqueeEnded(); }
	},

	/**
	* @private
	*/
	_marquee_enable: function () {
		this.set('_marquee_enabled', true);
	},

	/**
	* @private
	*/
	_marquee_disable: function () {
		this.set('_marquee_enabled', false);
		this._marquee_stopAnimation();
	},

	/**
	* Stops marquee animation.
	*
	* @fires module:moonstone/Marquee~MarqueeItem#onMarqueeEnded
	* @private
	*/
	_marquee_stopAnimation: function (sender, ev) {
		this.stopJob('stopMarquee');
		this._marquee_removeAnimationStyles();
		this.doMarqueeEnded();
	},

	/**
	* When animation ends, starts `this.stopMarquee` job.
	*
	* @private
	*/
	_marquee_animationEnded: function (sender, ev) {
		if (ev.originator !== this.$.marqueeText) {
			return;
		}

		this.startJob('stopMarquee', '_marquee_stopAnimation', this.marqueePause);
		return true;
	},

	/**
	* Returns `true` if this control has enough content to animate.
	*
	* @private
	*/
	_marquee_shouldAnimate: function (distance) {
		distance = (distance && distance >= 0) ? distance : this._marquee_calcDistance();
		return (distance > 0);
	},

	/**
	* Determines how far the marquee needs to scroll.
	*
	* @private
	*/
	_marquee_calcDistance: function () {
		var node, rect;

		if (this.$.marqueeText) {
			node = this.$.marqueeText.hasNode();
			if (node && this._marquee_distance == null && this.getAbsoluteShowing()) {
				rect = node.getBoundingClientRect();
				this._marquee_distance = Math.floor(Math.abs(node.scrollWidth - rect.width));

				//if the distance is exactly 0, then the ellipsis
				//most likely are hiding the content, and marquee does not
				//need to animate
				if(this._marquee_distance === 0) {
					this.applyStyle('text-overflow', 'clip');
					this.$.marqueeText && this.$.marqueeText.applyStyle('text-overflow', 'clip');
				} else {
					this.applyStyle('text-overflow', 'ellipsis');
					this.$.marqueeText && this.$.marqueeText.applyStyle('text-overflow', 'ellipsis');
				}
			}
		}

		return this._marquee_distance;
	},

	/**
	* Returns duration based on `distance` and `this.marqueeSpeed`.
	*
	* @private
	*/
	_marquee_calcDuration: function (distance) {
		return distance / this.marqueeSpeed;
	},

	/**
	* Creates a marquee-able `div` inside of `this`.
	*
	* @private
	*/
	_marquee_createMarquee: function () {
		// Do not create marqueeText when there are children
		// because we don't know what should be the controlParent
		if (this.children && this.children.length > 0) return;
		var marqueeText = {name: 'marqueeText', kind: Control, classes: 'moon-marquee-text', allowHtml: this.allowHtml, content: this.content},
			highlightText = null,
			wrapper;

		if (this instanceof HighlightText) {
			dom.setInnerHtml(this.hasNode(), '');
			highlightText = {renderDelegate: this.renderDelegate, highlightClasses: this.highlightClasses, search: this.search};
			marqueeText = util.mixin(marqueeText, highlightText);
		}
		wrapper = this.createComponent({name: 'marqueeTextWrapper', kind: Control, classes: 'moon-marquee-text-wrapper', components: [marqueeText]});
		wrapper.renderInto(this.hasNode());
		return true;
	},

	/**
	* @private
	*/
	_marquee_addAnimationStyles: function (distance) {
		if (!this.$.marqueeText) return;
		var duration = this._marquee_calcDuration(distance);

		this.$.marqueeText.addClass('animate-marquee');

		if (options.accelerate) {
			dom.transform(this.$.marqueeText, {translateZ: 0});
			this.$.marqueeText.applyStyle('transition', 'transform ' + duration + 's linear');
			this.$.marqueeText.applyStyle('-webkit-transition', '-webkit-transform ' + duration + 's linear');
		} else {
			this.$.marqueeText.applyStyle('transition', 'left ' + duration + 's linear');
			this.$.marqueeText.applyStyle('-webkit-transition', 'left ' + duration + 's linear');
		}

		// Need this timeout for FF!
		setTimeout(this.bindSafely(function () {
			if (options.accelerate) {
				dom.transform(this.$.marqueeText, {translateX: this._marquee_adjustDistanceForRTL(distance) + 'px'});
			} else {
				this.$.marqueeText.applyStyle('left', this._marquee_adjustDistanceForRTL(distance) + 'px');
			}
		}), platform.firefox ? 100 : 16);
	},

	/**
	* @private
	*/
	_marquee_removeAnimationStyles: function () {
		if (!this.$.marqueeText) {
			return;
		}

		this.$.marqueeText.applyStyle('transition-duration', '0s');
		this.$.marqueeText.applyStyle('-webkit-transition-duration', '0s');

		// Need this timeout for FF!
		/**
		* @private
		*/
		setTimeout(this.bindSafely(function () {
			this.$.marqueeText.removeClass('animate-marquee');
			if (options.accelerate) {
				dom.transform(this.$.marqueeText, {translateX: null, translateZ: null});
			} else {
				this.$.marqueeText.applyStyle('left', null);
			}
		}), platform.firefox ? 100 : 0);
	},

	/**
	* Flips distance value for RTL support.
	*
	* @private
	*/
	_marquee_adjustDistanceForRTL: function (distance) {
		return this.rtl ? distance : distance * -1;
	},

	/**
	* @private
	*/
	_marquee_reset: function () {
		this._marquee_invalidateMetrics();
		if (this._marquee_puppetMaster) {
			this._marquee_puppetMaster.resetMarquee();
		}
	},

	/**
	* @private
	*/
	_marquee_centeredChanged: function () {
		this._marquee_detectAlignment();
	},

	/**
	* @private
	*/
	_marquee_wrapInsteadOfMarqueeChanged: function(old) {
		if (this.wrapInsteadOfMarquee) {
			this.addClass('allow-wrap');
			if (this.$.marqueeText) {
				this.$.marqueeTextWrapper.destroy();
				this.render();
			}
		}
		if (old && !this.wrapInsteadOfMarquee) {
			this.removeClass('allow-wrap');
			// FIXME: Performing creation here to workaround potential WebKit measuring issue
			// with scrollWidth (under-measures by 10px when marquee components are destroyed
			// when we switch wrapInsteadofMarquee from `false` to `true`, and back to `false`).
			this._marquee_createMarquee();
		}
	}
};

exports.Item = MarqueeItem;

/**
* {@link module:moonstone/Marquee~MarqueeText} is a basic text control that supports marquee animation.
* When MarqueeText objects are used inside a
* [MarqueeDecorator]{@link module:moonstone/Marquee~MarqueeDecorator}, the decorator synchronizes
* their start times; the user may start a marquee programmatically by calling
* [startMarquee()]{@link module:moonstone/Marquee~MarqueeSupport#startMarquee}.
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		Header = require('moonstone/Header'),
* 		MarqueeSupport = require('moonstone/Marquee').Support,
* 		MarqueeText = require('moonstone/Marquee').Text;
*
* 	module.exports = kind({
* 		name: Header,
* 		mixins: [MarqueeSupport],
* 		marqueeSpeed: 100,
* 		components: [
* 			{kind: MarqueeText, content: 'longText+longText'},
* 			{kind: MarqueeText, content: 'longText'}
* 		],
* 		rendered: function () {
* 			this.startMarquee();
* 		}
* 	});
* ```
*
* To add the marquee feature to a kind, simply use the
* [MarqueeSupport]{@link module:moonstone/Marquee~MarqueeSupport} mixin:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('enyo/Button'),
* 		MarqueeSupport = require('moonstone/Marquee').Support,
* 		MarqueeText = require('moonstone/Marquee').Text;
*
* 	module.exports = kind({
* 		name: 'MarqueeButton',
* 		kind: Button,
* 		mixins: [MarqueeSupport],
* 		components: [
* 			{kind: MarqueeText}
* 		],
* 		contentChanged: function () {
* 			this.$.marqueeText.setContent(this.content);
* 		}
* 	});
* ```
*
* @class MarqueeText
* @extends module:enyo/Control~Control
* @mixes module:moonstone/Marquee~MarqueeItem
* @ui
* @public
*/
exports.Text = kind(
	/** @lends module:moonstone/Marquee~MarqueeText.prototype */ {

	/**
	* @private
	*/
	name: 'moon.MarqueeText',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [MarqueeItem],

	/**
	* @private
	* @lends module:moonstone/Marquee~MarqueeText.prototype
	*/
	published: {

		/**
		* The speed of the marquee animation, in pixels per second.
		*
		* @type {Number}
		* @default 60
		* @public
		*/
		marqueeSpeed: 60,

		/**
		* The duration in milliseconds that the marquee will pause at the end of the
		* animation, before resetting to the beginning.
		*
		* @type {Number}
		* @default 1000
		* @public
		*/
		marqueePause: 1000,

		/**
		* When `true`, marqueeing will not occur.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* When `true`, text is centered; otherwise, it is left-aligned.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		centered: false,

		/**
		* When `true`, element wraps instead of marqueeing.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		wrapInsteadOfMarquee: false
	}
});

/**
* {@link module:moonstone/Marquee~MarqueeDecorator} is a wrapper for {@link module:moonstone/Marquee~MarqueeText} objects.
*
* @class MarqueeDecorator
* @extends module:enyo/Control~Control
* @mixes module:moonstone/Marquee~MarqueeSupport
* @ui
* @public
*/
var MarqueeDecorator = kind(
	/** @lends module:moonstone/Marquee~MarqueeDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.MarqueeDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	*/
	style: 'overflow: hidden;'
});

/**
* The {@link module:moonstone/Marquee~MarqueeDecorator} export
* @public
*/
exports.Decorator = MarqueeDecorator;

},{'../options':'moonstone/options','../HighlightText':'moonstone/HighlightText'}],'moonstone/InputDecorator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/InputDecorator~InputDecorator} kind.
* @module moonstone/InputDecorator
*/

var
	kind = require('enyo/kind'),
	ToolDecorator = require('enyo/ToolDecorator');

var
	Spotlight = require('spotlight');

var
	$L = require('../i18n'),
	Input = require('../Input'),
	RichText = require('../RichText'),
	TextArea = require('../TextArea'),
	Tooltip = require('../Tooltip');

/**
* {@link module:moonstone/InputDecorator~InputDecorator} is a control that provides input styling. Any controls
* in the InputDecorator will appear to be inside an area styled as an input. Usually,
* an InputDecorator surrounds a {@link module:moonstone/Input~Input}:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('moonstone/Input'),
* 		InputDecorator = require('moonstone/InputDecorator');
*
* 	{kind: InputDecorator, components: [
* 		{kind: Input}
* 	]}
* ```
*
* Other controls, such as buttons, may be placed to the right or left of the
* input control, e.g.:
*
* ```
* 	var
* 		IconButton = require('moonstone/IconButton');
*
* 	{kind: InputDecorator, components: [
* 		{kind: IconButton, src: 'moonstone/src/assets/search.png'},
* 		{kind: Input},
* 		{kind: IconButton, src: 'moonstone/src/assets/cancel.png'}
* 	]}
* ```
*
* Note that the InputDecorator fits around the content inside it. If the
* decorator is sized, then its contents will likely need to be sized as well.
*
* ```
* 	{kind: InputDecorator, style: 'width: 500px;', components: [
* 		{kind: Input, style: 'width: 100%;'}
* 	]}
* ```
*
* @class InputDecorator
* @extends module:enyo/ToolDecorator~ToolDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/InputDecorator~InputDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.InputDecorator',

	/**
	* @private
	*/
	kind: ToolDecorator,

	/**
	* When `true`, the message tooltip is shown if it exists.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	invalid: false,

	/**
	* The tooltip text to be displayed when the contents of the input are invalid. If this value is
	* falsy, the tooltip will not be shown.
	*
	* @type {String}
	* @default ''
	* @public
	*/
	invalidMessage: '',

	/**
	* @private
	*/
	tag: 'label',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	spotlightDecorate: false,

	/**
	* @private
	*/
	handlers: {
		onDisabledChange    : 'disabledChangeHandler',
		onfocus             : 'focusHandler',
		onblur              : 'blurHandler',
		onSpotlightFocused  : 'spotlightFocusedHandler',
		onSpotlightSelect   : 'spotlightSelectHandler',
		onSpotlightBlur     : 'spotlightBlurHandler',
		onSpotlightLeft     : 'spotlightLeftHandler',
		onSpotlightRight    : 'spotlightRightHandler',
		onSpotlightUp       : 'spotlightUpHandler',
		onSpotlightDown     : 'spotlightDownHandler'
	},

	/**
	* @private
	*/
	tools: [
		{name: 'tooltip', kind: Tooltip, floating: false, position: 'right top'}
	],

	/**
	* @private
	*/
	observers: [
		{path: ['invalid', 'invalidMessage'], method: 'updateValidity'}
	],

	/**
	* @private
	*/
	_oInputControl: null,

	/**
	* Returns boolean indicating whether passed-in control is an input field.
	*
	* @private
	*/
	_isInput: function (oControl) {
		return (
			oControl instanceof Input		||
			oControl instanceof RichText	||
			oControl instanceof TextArea
		);
	},

	/**
	* Traverses tree of children to find input control.
	*
	* @private
	*/
	_findInputControl: function (oControl) {
		oControl = oControl || this;

		var oInputControl = null;

		for (var n=0; n<oControl.children.length; n++) {
			if (this._isInput(oControl.children[n])) {
				return oControl.children[n];
			}
			if ((oInputControl = this._findInputControl(oControl.children[n]))) {
				return oInputControl;
			}
		}
	},

	/**
	* @private
	*/
	create: function () {
		ToolDecorator.prototype.create.apply(this, arguments);
		this.updateFocus(false);
		this._oInputControl = this._findInputControl();
		if (this._oInputControl instanceof Input) {
			this.addClass('moon-divider-text moon-input-decorator');
		}
		if (this._oInputControl instanceof TextArea || this._oInputControl instanceof RichText) {
			this.addClass('moon-divider-text moon-textarea-decorator');
		}

		this.updateValidity();
	},

	/**
	* @private
	*/
	createComponent: function () {
		var ret = ToolDecorator.prototype.createComponent.apply(this, arguments);
		this._oInputControl = this._findInputControl();
		return ret;
	},

	/**
	* @private
	*/
	createComponents: function () {
		var ret = ToolDecorator.prototype.createComponents.apply(this, arguments);
		this._oInputControl = this._findInputControl();
		return ret;
	},

	/**
	* Updates styling based on focus state.
	*
	* @param {Boolean} bFocus - Whether to add/remove `moon-focused` class.
	* @public
	*/
	updateFocus: function (bFocus) {
		this.set('focused', bFocus);
		this.addRemoveClass('moon-focused', this.alwaysLooksFocused || this.focused);
	},

	/**
	* Retrieves the child input control.
	*
	* @returns {Object} A reference to the child input control.
	* @public
	*/
	getInputControl: function () {
		return this._oInputControl;
	},

	// Event handlers:
	/**************************************************/

	/**
	* @private
	*/
	focusHandler: function (oSender, oEvent) {
		if (Spotlight.getCurrent() != this) {
			// Force a spot here, even when we're in pointer mode,
			// to ensure that clicks inside us (e.g. to position
			// the cursor) don't cause Spotlight to unfreeze
			Spotlight.spot(this, {focusType: 'point'});
		}
		Spotlight.freeze();
		this.updateFocus(true);
	},

	/**
	* @private
	*/
	blurHandler: function () {
		Spotlight.unfreeze();
		this.updateFocus(false);
	},

	/**
	* @private
	*/
	disabledChangeHandler: function (oSender, oEvent) {
		this.addRemoveClass('moon-disabled', oEvent.originator.disabled);
	},

	// Spotlight Event handlers:
	/**************************************************/

	/**
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	spotlightFocusedHandler: function () {
		this.set('spotted', true);
		this.bubble('onRequestScrollIntoView');
	},

	/**
	* @private
	*/
	spotlightSelectHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput) {
			if (oInput.hasFocus() && oEvent) {
				return true;
			} else {
				oInput.focus();
			}
			return false;
		}
	},

	/**
	* @private
	*/
	spotlightBlurHandler: function (oSender, oEvent) {
		this.set('spotted', false);
		this.blur();
	},

	/**
	* @private
	*/
	spotlightLeftHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.left) {
			if (oInput.left()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightLeft to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	/**
	* @private
	*/
	spotlightRightHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.right) {
			if (oInput.right()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightRight to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	/**
	* @private
	*/
	spotlightUpHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.up) {
			if (oInput.up()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightUp to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	/**
	* @private
	*/
	spotlightDownHandler: function (oSender, oEvent) {
		var oInput = this.getInputControl();
		if (oInput && oInput.hasFocus() && oInput.down) {
			if (oInput.down()) {
				oEvent.allowDomDefault();       // Allow keydown to bubble
				return true;                    // Prevent onSpotlightLeft to bubble
			} else {
				this.blur();
				oInput.blur();
			}
		}
	},

	// Change handlers

	/**
	* @private
	*/
	updateValidity: function () {
		var comps, length, i;
		// we want the ability to add the 'moon-invalid' class even if there is no invalid message
		this.addRemoveClass('moon-invalid', this.invalid);
		if (this.invalid && this.invalidMessage) {
			if (!this.$.tooltip) { // lazy creation of tooltip
				comps = this.createComponents(this.tools);
				if (this.hasNode()) {
					// rendering only the created tools, to prevent loss of focus on the input
					for (i = 0, length = comps.length; i < length; i++) {
						comps[i].render();
					}
				}
				this.$.tooltip.activator = this;
			}
			this.$.tooltip.set('content', this.invalidMessage);
			this.$.tooltip.set('showing', true);
		} else if (this.$.tooltip) {
			this.$.tooltip.set('showing', false);
		}
	},

	// Accessibility

	/**
	* spotted and focused can change in sequence but within the same cycle causing the TV to read
	* changes when spotting a different control. Enabling this will batch up those changes into
	* one DOM update thereby avoiding this behavior.
	*
	* @type {Boolean}
	* @default true
	* @private
	*/
	accessibilityDefer: true,

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['spotted', 'focused'], method: function () {
			var text = '',
				oInput = this.getInputControl();

			this.set('accessibilityLive', this.focused || !this.spotted ? null : 'polite');
			if (oInput) {
				if (oInput instanceof RichText && oInput.hasNode()) {
					text = (oInput.hasNode().innerText || oInput.getPlaceholder()) + ' ' + $L('edit box');
				} else if (oInput.type == 'password' && oInput.getValue()) {
					var character = (oInput.getValue().length > 1) ? $L('characters') : $L('character');
					text = oInput.getValue().length + ' ' + character + ' ' + $L('edit box');
				} else {
					text = (oInput.getValue() || oInput.getPlaceholder()) + ' ' + $L('edit box');
				}
			}
			this.set('accessibilityLabel', this.spotted && !this.focused ? text : null);
		}}
	]
});

},{'../i18n':'moonstone/i18n','../Input':'moonstone/Input','../RichText':'moonstone/RichText','../TextArea':'moonstone/TextArea','../Tooltip':'moonstone/Tooltip'}],'moonstone/Button':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Button~Button} kind.
* @module moonstone/Button
*/

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	Button = require('enyo/Button');

var
	Marquee = require('../Marquee'),
	MarqueeSupport = Marquee.Support,
	MarqueeText = Marquee.Text;

/**
* {@link module:moonstone/Button~Button} is an {@link module:enyo/Button~Button} with Moonstone styling applied.
* The color of the button may be customized by specifying a background color.
*
* For more information, see the documentation on
* [Buttons]{@linkplain $dev-guide/building-apps/controls/buttons.html} in the
* Enyo Developer Guide.
*
* @class Button
* @extends module:enyo/Button~Button
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Button~Button.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Button',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	tag: 'span',

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	* @lends module:moonstone/Button~Button.prototype
	*/
	published: {

		/**
		* A boolean parameter affecting the size of the button. If `true`, the
		* button's diameter will be set to 60px. However, the button's tap target
		* will still have a diameter of 78px, with an invisible DOM element
		* wrapping the small button to provide the larger tap zone.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		small: false,

		/**
		* A boolean parameter affecting the minimum width of the button. When `true`,
		* the minimum width will be set to 180px (or 130px if [small]{@link module:moonstone/Button~Button#small}
		* is `true`). If `false`, the minimum width will be set to the current value of
		* `@moon-button-height` (thus forcing the button to be no smaller than a circle with
		* diameter `@moon-button-height`).
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		minWidth: true,

		/**
		* When `true`, the content will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/Button~Button#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		contentUpperCase: null,

		/**
		* The background-color opacity of this button; valid values are `'opaque'`, `'translucent'`,
		* and `'transparent'`.
		*
		* @type {String}
		* @default 'opaque'
		* @public
		*/
		backgroundOpacity: 'opaque'
	},

	/**
	* @private
	*/
	classes: 'moon-large-button-text moon-button enyo-unselectable moon-composite',

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	handlers: {

		/**
		* `onSpotlightSelect` simulates `mousedown`.
		*
		* @private
		*/
		onSpotlightKeyDown	: 'depress',

		/**
		* `onSpotlightKeyUp` simulates `mouseup`.
		*
		* @private
		*/
		onSpotlightKeyUp	: 'undepress',

		/**
		* Also make sure we remove the pressed class if focus is removed from
		* this item before it receives a keyup.
		*
		* @private
		*/
		onSpotlightBlur		: 'undepress',

		/**
		* The handler for `onSpotlightFocused` bubbles a `requestScrollIntoView` event.
		*
		* @private
		*/
		onSpotlightFocused	: 'spotFocused'
	},

	/**
	* On creation, updates based on value of `this.small`.
	*
	* @private
	*/
	initComponents: function () {
		if (!(this.components && this.components.length > 0)) {
			this.createComponent({name: 'client', kind: MarqueeText, classes: 'button-client', isChrome: true});
		}
		if (this.small) this.smallChanged();
		if (this.minWidth) this.minWidthChanged();

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the contentUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.contentUpperCase !== null) this.uppercase = this.contentUpperCase;

		this.contentChanged();
		this.backgroundOpacityChanged();
		Button.prototype.initComponents.apply(this, arguments);
	},

	/**
	* Adds `pressed` CSS class.
	*
	* @private
	*/
	depress: function (inSender, inEvent) {
		if (inEvent.keyCode === 13) {
			this.addClass('pressed');
		}
	},

	/**
	* Bubbles `requestScrollIntoView` event.
	*
	* @fires module:moonstone/Scroller~Scroller#onRequestScrollIntoView
	* @private
	*/
	spotFocused: function (inSender, inEvent) {
		if (inEvent.originator === this) {
			this.bubble('onRequestScrollIntoView');
		}
	},

	/**
	* Removes `pressed` CSS class.
	*
	* @private
	*/
	undepress: function () {
		this.removeClass('pressed');
	},

	/**
	* If `this.small` is `true`, `taparea` dimensions are increased.
	*
	* @private
	*/
	smallChanged: function () {
		if (this.small) {
			this.addClass('small');
			this.addClass('moon-small-button-text');
		} else {
			this.removeClass('small');
			this.removeClass('moon-small-button-text');
		}
	},

	/**
	* Override to handle potential child components.
	*
	* @private
	*/
	contentChanged: function () {
		var content = this.getContent();
		if (this.$.client) {
			this.$.client.setContent( this.get('uppercase') ? util.toUpperCase(content) : content );
		} else {
			Button.prototype.contentChanged.apply(this, arguments);
		}
	},

	/**
	* @private
	*/
	uppercaseChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// contentUpperCase is fully deprecated and removed.
		if (this.contentUpperCase != this.uppercase) this.contentUpperCase = this.uppercase;
		this.contentChanged();
	},

	/**
	* @private
	*/
	contentUpperCaseChanged: function () {
		if (this.uppercase != this.contentUpperCase) this.uppercase = this.contentUpperCase;
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	minWidthChanged: function () {
		if (this.minWidth) {
			this.addClass('min-width');
		} else {
			this.removeClass('min-width');
		}
	},

	/**
	* @private
	*/
	showingChanged: function () {
		Button.prototype.showingChanged.apply(this, arguments);
		if (!this.showing && this.hasClass('pressed')) {
			this.undepress();
		}
	},

	/**
	* @private
	*/
	backgroundOpacityChanged: function (old) {
		var opacity = this.backgroundOpacity;
		if (old) this.removeClass(old);
		if (opacity == 'translucent' || opacity == 'transparent') {
			this.addClass(opacity);
		}
	}
});

},{'../Marquee':'moonstone/Marquee'}],'moonstone/Header':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/Header~Header} kind.
* @module moonstone/Header
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	ri = require('enyo/resolution'),
	util = require('enyo/utils'),
	Control = require('enyo/Control');

var
	Input = require('../Input'),
	InputDecorator = require('../InputDecorator'),
	StyleAnimator = require('../StyleAnimator'),
	Marquee = require('../Marquee'),
	MarqueeSupport = Marquee.Support,
	MarqueeText = Marquee.Text;

var _delayedMeasurementFinished;

/**
* Custom input event to allow apps to distinguish header inputs from regular inputs.
*
* @event module:moonstone/Header~Header#onInputHeaderInput
* @type {Object}
* @property {Object} originalEvent - The original event fired from the input. See
*	{@link module:enyo/Input~Input#oninput} for more event information.
* @public
*/

/**
* Custom input change event to allow apps to distinguish header input changes from
* regular input changes.
*
* @event module:moonstone/Header~Header#onInputHeaderChange
* @type {Object}
* @property {Object} originalEvent - The original event fired from the input. See
*	{@link module:enyo/Input~Input#onchange} for more event information.
* @public
*/

/**
* {@link module:moonstone/Header~Header} is a Moonstone-styled control with a large title and an area for
* additional controls.
*
* @class Header
* @extends module:enyo/Control~Control
* @mixes module:moonstone/MarqueeSupport~MarqueeSupport
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Header~Header.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Header',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'moon-header',

	/**
	* @private
	* @lends module:moonstone/Header~Header.prototype
	*/
	published: {

		/**
		* Title of the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		title: '',

		/**
		* Text above the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleAbove: '',

		/**
		* Text below the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleBelow: '',

		/**
		* Sub-text below the header.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		subTitleBelow: '',

		/**
		* Size of the header, for styling purposes. Will be one of `'large'` (the default),
		* `'medium'`, or `'small'`. If `'large'`, the `moon-header` CSS class will be applied
		* to this header; if `'medium'`, the `moon-medium-header` class will be applied; if
		* `'small'`, the `moon-small-header` class will be applied.
		*
		* @type {String}
		* @default 'large'
		* @public
		*/
		type: 'large',

		/**
		* If `true`, the `moon-medium-header` CSS class will be applied to this header.
		*
		* Note that this property will be deprecated soon. For now, it is being left in
		* for backward compatibility. Until it is removed, `small: true` refers to the
		* historical header size, which is now equivalent to `type: 'medium'`.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		small: false,

		/**
		* URL(s) of background image(s).
		* This may be a string referring a single background image, or an array of strings
		* referring to multiple background images. To support multiple background images at
		* multiple resolutions, this property accepts data in several formats:
		*
		* 1. A string `src` value
		* 2. An array of string `src` values
		* 3. A [multi-resolution hash]{@link module:enyo/resolution#selectSrc~src}
		* 4. An array of [multi-resolution hashes]{@link module:enyo/resolution#selectSrc~src}
		*
		* @type {(String|String[]|module:enyo/resolution#selectSrc~src|module:enyo/resolution#selectSrc~src[])}
		* @default null
		* @public
		*/
		backgroundSrc: null,

		/**
		* Position of background image, defined as a string of the form
		* `'<vertical> <horizontal>'`, with a space separating the `<vertical>`
		* and `<horizontal>` values (e.g., `'top right'`). If no second property
		* is specified, the `<horizontal>` value will default to `'right'`. As
		* with [backgroundSrc]{@link module:moonstone/Header~Header#backgroundSrc}, an array of strings
		* may be supplied to position multiple background images. The order of items
		* should be the same as in `backgroundSrc`.
		*
		* @type {(String|String[])}
		* @default 'top right'
		* @public
		*/
		backgroundPosition: 'top right',

		/**
		* When using a full-bleed background image, set this property to `true` to indent
		* the header text/controls and remove the header lines.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		fullBleedBackground: false,

		/**
		* If `true`, title will be an input.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		inputMode: false,

		/**
		* When `true`, input will be blurred on Enter keypress, if it was previously
		* focused.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		dismissOnEnter: false,

		/**
		* Text to display when the input is empty.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		placeholder: '',

		/**
		* The value of the input.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		value: '',

		/**
		* When `true`, the title text will have locale-safe uppercasing applied.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		uppercase: true,

		/**
		* @deprecated Replaced by [uppercase]{@link module:moonstone/Header~Header#uppercase}.
		*
		* Formerly defaulted to `true`, now defaults to `null` and will only have
		* an effect when explicitly set (for complete backward compatibility).
		*
		* @type {Boolean}
		* @default null
		* @public
		*/
		titleUpperCase: null
	},

	/**
	* @private
	*/
	mixins: [MarqueeSupport],

	/**
	* @private
	*/
	marqueeOnSpotlight: false,

	/**
	* @private
	*/
	marqueeOnHover: true,

	/**
	* @private
	*/
	marqueeOnRender: true,

	/**
	* @private
	*/
	marqueeOnRenderDelay: 10000,

	/**
	* Described in .moon-header class
	*
	* @private
	*/
	standardHeight: 360,

	/**
	* @private
	*/
	handlers: {
		oninput: 'handleInput',
		onchange: 'handleChange'
	},

	/**
	* @private
	*/
	events: {

		/**
		* Custom input event to allow apps to distinguish header inputs from regular inputs.
		*/
		onInputHeaderInput: '',

		/**
		* Custom input change event to allow apps to distinguish header input changes from
		* regular input changes.
		*/
		onInputHeaderChange: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'titleAbove', kind: Control, classes: 'moon-super-header-text moon-header-title-above'},
		{name: 'titleWrapper', kind: Control, classes: 'moon-header-title-wrapper', components: [
			{name: 'title', kind: MarqueeText, classes: 'moon-header-text moon-header-title', canGenerate: false},
			{name: 'inputDecorator', kind: InputDecorator, classes: 'moon-input-header-input-decorator',canGenerate: false, components: [
				{name: 'titleInput', kind: Input, classes: 'moon-header-text moon-header-title'}
			]}
		]},
		{name: 'titleBelow', kind: MarqueeText, classes: 'moon-sub-header-text moon-header-title-below'},
		{name: 'subTitleBelow', kind: MarqueeText, classes: 'moon-sub-header-text moon-header-sub-title-below'},
		{name: 'client', kind: Control, classes: 'moon-hspacing moon-header-client'},
		{name: 'animator', kind: StyleAnimator, onComplete: 'animationComplete'}
	],

	/**
	* @private
	*/
	bindings: [
		{from: '.value', to: '.$.titleInput.value', oneWay: false},
		{from: '.dismissOnEnter', to: '.$.titleInput.dismissOnEnter'}
	],

	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);

		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// the titleUpperCase property is fully deprecated and removed. The legacy
		// property takes precedence if it exists.
		if (this.titleUpperCase !== null) this.uppercase = this.titleUpperCase;

		// Note: This smallchanged() line will be deprecated soon. For backward compatiblity, I leave it for a
		// while.
		this.smallChanged();
		this.typeChanged();
		this.titleChanged();
		this.titleAboveChanged();
		this.titleBelowChanged();
		this.subTitleBelowChanged();
		this.allowHtmlChanged();
		this.backgroundSrcChanged();
		this.backgroundPositionChanged();
		this.inputModeChanged();
		this.placeholderChanged();
		this.fullBleedBackgroundChanged();
	},

	rendered: function() {
		this.inherited(arguments);
		// At the first render, the fonts may not have finished loading yet. We delay the first
		// time using an async method, and set a flag so we know the deed is done at subsequent calls.
		if (_delayedMeasurementFinished) {
			this.adjustTitleWidth();
		} else {
			util.asyncMethod(this, function () {
				this.adjustTitleWidth();
				_delayedMeasurementFinished = true;
			});
		}
	},

	/**
	* @private
	*/
	allowHtmlChanged: function () {
		this.$.title.setAllowHtml( this.get('type') == 'small' ? true : this.allowHtml );
		this.$.titleBelow.setAllowHtml(this.allowHtml);
		this.$.subTitleBelow.setAllowHtml(this.allowHtml);
	},

	/**
	* @private
	*/
	backgroundSrcChanged: function () {
		var bgs = (util.isArray(this.backgroundSrc)) ? this.backgroundSrc : [this.backgroundSrc];
		bgs = util.map(bgs, this.bindSafely(function (inBackgroundSource) {
				return inBackgroundSource ? 'url(' + ri.selectSrc(inBackgroundSource) + ')' : null;
			}));
		this.applyStyle('background-image', (bgs.length) ? bgs.join(', ') : null);
	},

	/**
	* @private
	*/
	backgroundPositionChanged: function () {
		var bgp = this.backgroundPosition;
		if (util.isArray(bgp)) {
			bgp = (bgp.length) ? bgp.join(', ') : null;
		}
		// If `this.backgroundPosition` is set explicitly to inherit or initial, apply that
		// instead of assuming a position.
		if (bgp == 'inherit' || bgp == 'initial') {
			this.applyStyle('background-position', bgp);
			return;
		}
		var posArray = bgp && bgp.split(' ') || [],
			posStr = (posArray.length === 0) ? 'top right'
					: (posArray.length === 1) ? posArray[0] + ' right' : bgp;
		this.applyStyle('background-position', posStr);
	},

	/**
	* @private
	*/
	fullBleedBackgroundChanged: function () {
		this.addRemoveClass('full-bleed', this.fullBleedBackground);
	},

	/**
	* Collapses the drawer, hiding its contents.
	*
	* @public
	*/
	collapseToSmall: function () {
		if (this.collapsed) {
			return;
		}

		var myStyle = dom.getComputedStyle(this.hasNode());
		var titleWrapperStyle = dom.getComputedStyle(this.$.titleWrapper.hasNode());
		var titleBelowStyle = dom.getComputedStyle(this.$.titleBelow.hasNode());
		var subTitleBelowStyle = dom.getComputedStyle(this.$.subTitleBelow.hasNode());
		var titleAboveStyle = dom.getComputedStyle(this.$.titleAbove.hasNode());

		// TODO - animator should track initial positions so we don't have to store these if we
		// want to reverse the animation
		this.smallAnimProps = {
			'height': myStyle['height']
		};
		this.$.titleWrapper.smallAnimProps = {
			'padding-left': titleWrapperStyle['padding-left'],
			'top': titleWrapperStyle['top']
		};
		this.$.title.smallAnimProps = {};
		this.$.titleAbove.smallAnimProps = {
			'height': titleAboveStyle['height'],
			'opacity': titleAboveStyle['opacity']
		};
		this.$.titleBelow.smallAnimProps = {
			'top': titleBelowStyle['top']
		};
		this.$.subTitleBelow.smallAnimProps = {
			'top': subTitleBelowStyle['top']
		};

		this.$.animator.newAnimation({
			name: 'collapseToSmall',
			duration: 200,
			timingFunction: 'linear',
			keyframes: {
				0: [{
					control: this,
					properties: {
						'height': 'current'
					}
				}, {
					control: this.$.titleWrapper,
					properties: {
						'padding-left': 'current',
						'top': 'current'
					}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': 'current',
						'opacity': 'current',
						'margin-top': 'current'
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {
						'top': 'current'
					}
				}, {
					control: this.$.subTitleBelow,
					properties: {
						'top': 'current'
					}
				}],
				70: [],
				100: [{
					control: this,
					properties: {
						'height': dom.unit(ri.scale(260), 'rem')
					}
				}, {
					control: this.$.titleWrapper,
					properties: {}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': 0,
						'opacity': 0,
						'margin-top': 0
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {}
				}, {
					control: this.$.subTitleBelow,
					properties: {}
				}]

			}
		});
		this.$.animator.play('collapseToSmall');
		this.collapsed = true;
	},

	/**
	* Expands the drawer, showing its contents.
	*
	* @public
	*/
	expandToLarge: function () {
		if (!this.collapsed) {
			return;
		}

		this.$.animator.newAnimation({
			name: 'expandToLarge',
			duration: 200,
			timingFunction: 'linear',
			keyframes: {
				0: [{
					control: this,
					properties: {
						'height': 'current'
					}
				}, {
					control: this.$.titleWrapper,
					properties: {
						'padding-left': 'current',
						'top': 'current'
					}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': 'current',
						'opacity': 'current',
						'margin-top': 'current'
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {
						'top': 'current'
					}
				}, {
					control: this.$.subTitleBelow,
					properties: {
						'top': 'current'
					}
				}],
				30: [],
				100: [{
					control: this,
					properties: {
						'height': this.smallAnimProps.height
					}
				}, {
					control: this.$.titleWrapper,
					properties: {
						'padding-left': this.$.titleWrapper.smallAnimProps['padding-left'],
						'top': this.$.titleWrapper.smallAnimProps['top']
					}
				}, {
					control: this.$.titleAbove,
					properties: {
						'height': this.$.titleAbove.smallAnimProps['height'],
						'opacity': this.$.titleAbove.smallAnimProps['opacity'],
						'margin-top': this.$.titleAbove.smallAnimProps['margin-top']
					}
				}, {
					control: this.$.title,
					properties: {}
				}, {
					control: this.$.titleBelow,
					properties: {
						'top': this.$.titleBelow.smallAnimProps['top']
					}
				}, {
					control: this.$.subTitleBelow,
					properties: {
						'top': this.$.subTitleBelow.smallAnimProps['top']
					}
				}]
			}
		});
		this.$.animator.play('expandToLarge');
		this.collapsed = false;
	},

	/**
	* @private
	*/
	typeChanged: function () {
		this.addRemoveClass('moon-large-header', this.get('type') == 'large');
		this.addRemoveClass('moon-medium-header', this.get('type') == 'medium');
		this.addRemoveClass('moon-small-header', this.get('type') == 'small');
		this.contentChanged();
		if (this.generated) this.adjustTitleWidth();
	},

	/**
	* @private
	*/
	valueChanged: function () {
		this.$.titleInput.detectTextDirectionality((this.$.titleInput.value || this.$.titleInput.value === 0 || this.$.titleInput.value === '0') ? this.$.titleInput.value : this.$.titleInput.get('placeholder'));
	},

	/**
	* @private
	*/
	adjustTitleWidth: function() {
		var type = this.get('type'),
			// Measure client area's width + 40px of spacing
			client = this.$.client ? this.$.client.hasNode() : null,
			clientWidth = client ? client.offsetWidth : null,
			clientStyle = client ? (client.currentStyle || dom.getComputedStyle(client)) : null,		// Originally by YuC @ http://stackoverflow.com/questions/349257/detecting-true-border-padding-and-margin-from-javascript
			clientMargin = client ? (parseInt(clientStyle.marginLeft, 10) + parseInt(clientStyle.marginRight, 10)) : null,
			clientSpaceSmall = dom.unit(clientWidth + clientMargin + ri.scale(36), 'rem'),
			clientSpace = dom.unit(clientWidth + ri.scale(36), 'rem'),
			rtl = this.rtl;

		if (client) {
			// Set the margin on the correct side for the correct control, otherwise set it to nothing
			this.$.title.applyStyle('margin-right', (type == 'small' && !rtl && clientWidth) ? clientSpaceSmall : null);
			this.$.title.applyStyle('margin-left', (type == 'small' && rtl && clientWidth) ? clientSpaceSmall : null);

			this.$.titleBelow.applyStyle('margin-right', (type == 'medium' && !rtl && clientWidth) ? clientSpace : null);
			this.$.titleBelow.applyStyle('margin-left', (type == 'medium' && rtl && clientWidth) ? clientSpace : null);

			this.$.subTitleBelow.applyStyle('margin-right', (type == 'medium' && !rtl && clientWidth) ? clientSpace : null);
			this.$.subTitleBelow.applyStyle('margin-left', (type == 'medium' && rtl && clientWidth) ? clientSpace : null);
		}
	},

	/**
	* Note that this method will be deprecated soon. For now, it is being left in for
	* backward compatibility.
	*
	* @private
	*/
	smallChanged: function () {
		this.addRemoveClass('moon-medium-header', this.get('small'));
	},

	/**
	* @private
	*/
	contentChanged: function () {
		var title = this.get('uppercase')
					? util.toUpperCase(this.get('title') || this.get('content'))
					: (this.get('title') || this.get('content')),
			subtitle = this.get('titleBelow');
		if ((this.get('type') == 'small') && subtitle) {
			this.$.title.set('allowHtml', true);
			if (!this.allowHtml) {
				title = dom.escape(title);
				subtitle = dom.escape(subtitle);
			}
			this.$.title.set('content', Control.prototype.rtl && !util.isRtl(subtitle + title) ?
				'<span class="moon-sub-header-text moon-header-sub-title">' + subtitle + '</span>' + '   ' + title :
				title + '   ' + '<span class="moon-sub-header-text moon-header-sub-title">' + subtitle + '</span>');
		} else {
			this.$.title.set('allowHtml', this.get('allowHtml') );
			this.$.title.set('content', title);
		}
		this.placeholderChanged();
	},

	/**
	* For backward-compatibility with original API.
	*
	* @private
	*/
	titleChanged: function () {
		this.contentChanged();
	},

	/**
	* @private
	*/
	placeholderChanged: function () {
		// For backward-compatibility with original API
		this.$.titleInput.set('placeholder', this.getTitleUpperCase()
				? util.toUpperCase(this.placeholder || this.title || this.content)
				: (this.placeholder || this.title || this.content) );
		this.valueChanged();
	},

	/**
	* @private
	*/
	uppercaseChanged: function () {
		// FIXME: Backwards-compatibility for deprecated property - can be removed when
		// titleUpperCase is fully deprecated and removed.
		if (this.titleUpperCase != this.uppercase) this.titleUpperCase = this.uppercase;
		this.titleChanged();
	},

	/**
	* @private
	*/
	titleUpperCaseChanged: function () {
		if (this.uppercase != this.titleUpperCase) this.uppercase = this.titleUpperCase;
		this.uppercaseChanged();
	},

	/**
	* @private
	*/
	titleAboveChanged: function () {
		this.$.titleAbove.addRemoveClass('no-border', this.titleAbove === '');
		this.$.titleAbove.set('content', this.titleAbove);
	},

	/**
	* @private
	*/
	titleBelowChanged: function () {
		this.$.titleBelow.set('content', this.titleBelow || '');
		this.contentChanged();
	},

	/**
	* @private
	*/
	subTitleBelowChanged: function () {
		this.$.subTitleBelow.set('content', this.subTitleBelow || '');
	},

	/**
	* Placeholder
	*
	* @private
	*/
	// animationComplete: function (inSender, inEvent) {
		// Do something?
	// },

	/**
	* @private
	*/
	inputModeChanged: function () {
		this.$.title.canGenerate = !this.inputMode;
		this.$.title.setShowing(!this.inputMode);
		this.$.inputDecorator.canGenerate = this.inputMode;
		this.$.inputDecorator.setShowing(this.inputMode);

		if (!this.inputMode) {
			if (!this.$.title.hasNode()) {
				this.$.title.render();
			}
			// Reset marquees when coming back to static text
			if (this.generated) {
				this.stopMarquee();
				this.startMarquee();
			}
		}
		if (this.inputMode && !this.$.inputDecorator.hasNode()) {
			this.$.inputDecorator.render();
		}
		this.addRemoveClass('moon-input-header', this.inputMode);
	},

	/**
	* Handles `input` event, firing custom
	* [onInputHeaderInput]{@link module:moonstone/Header~Header#onInputHeaderInput} event.
	*
	* @fires module:moonstone/Header~Header#onInputHeaderInput
	* @private
	*/
	handleInput: function (inSender, inEvent) {
		this.doInputHeaderInput({originalEvent: util.clone(inEvent, true)});
	},

	/**
	* Handles `change` event, firing custom
	* [onInputHeaderChange]{@link module:moonstone/Header~Header#onInputHeaderChange} event.
	*
	* @fires module:moonstone/Header~Header#onInputHeaderChange
	* @private
	*/
	handleChange: function (inSender, inEvent) {
		this.doInputHeaderChange({originalEvent: util.clone(inEvent, true)});
	}
});

},{'../Input':'moonstone/Input','../InputDecorator':'moonstone/InputDecorator','../StyleAnimator':'moonstone/StyleAnimator','../Marquee':'moonstone/Marquee'}],'moonstone/TooltipDecorator':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/TooltipDecorator~TooltipDecorator} kind.
* @module moonstone/TooltipDecorator
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Spotlight = require('spotlight');

var
	Button = require('../Button');

/**
* Bubble this event from a contained [control]{@link module:enyo/Control~Control} to mute tooltips. No data
* needs be passed with this event.
*
* @event module:moonstone/TooltipDecorator~TooltipDecorator#onRequestMuteTooltip
* @type {Object}
* @public
*/

/**
* Bubble this event from a contained [control]{@link module:enyo/Control~Control} to unmute tooltips. No data
* needs be passed with this event.
*
* @event module:moonstone/TooltipDecorator~TooltipDecorator#onRequestUnmuteTooltip
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/TooltipDecorator~TooltipDecorator} is a control that
* activates a {@link module:moonstone/Tooltip~Tooltip}. It surrounds a control
* such as a button and displays the tooltip when the control generates an
* `onenter` event:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('moonstone/Button'),
* 		Tooltip = require('moonstone/Tooltip'),
* 		TooltipDecorator = require('moonstone/TooltipDecorator');
*
* 	{kind: TooltipDecorator, components: [
* 		{kind: Button, content: 'Tooltip'},
* 		{kind: Tooltip, content: 'I am a tooltip for a button.'}
* 	]}
* ```
*
* Here is an example with a {@link module:moonstone/Input~Input} control and a decorator around the input:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('moonstone/Input'),
* 		InputDecorator = require('moonstone/InputDecorator'),
* 		Tooltip = require('moonstone/Tooltip'),
* 		TooltipDecorator = require('moonstone/TooltipDecorator');
*
* 	{kind: TooltipDecorator, components: [
* 		{kind: InputDecorator, components: [
* 			{kind: Input, placeholder: 'Just an input...'}
* 		]},
* 		{kind: Tooltip, content: 'I am just a tooltip for an input.'}
* 	]}
* ```
*
* Automatic hiding and showing of tooltips may be disabled by calling
* [mute()]{@link module:moonstone/TooltipDecorator~TooltipDecorator#mute} or by bubbling the
* [onRequestMuteTooltip]{@link module:moonstone/TooltipDecorator~TooltipDecorator#onRequestMuteTooltip} event;
* it may be re-enabled by calling [unmute()]{@link module:moonstone/TooltipDecorator~TooltipDecorator#unmute}
* or by bubbling the
* [onRequestUnmuteTooltip]{@link module:moonstone/TooltipDecorator~TooltipDecorator#onRequestUnmuteTooltip} event.
*
* @class TooltipDecorator
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/TooltipDecorator~TooltipDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'moon.TooltipDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	defaultKind: Button,

	/**
	* @private
	*/
	classes: 'moon-tooltip-decorator',

	/**
	* @private
	*/
	handlers: {
		onenter: 'requestShowTooltip',
		onleave: 'requestHideTooltip',
		onSpotlightFocused: 'requestShowTooltip',
		onSpotlightBlur: 'requestHideTooltip',
		onRequestMuteTooltip: 'mute',
		onRequestUnmuteTooltip: 'unmute'
	},

	/**
	* @private
	* @lends module:moonstone/TooltipDecorator~TooltipDecorator.prototype
	*/
	published: {
		/**
		* Boolean indicating whether tooltips are automatically shown when the activator is
		* hovered over.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoShow: true
	},

	/**
	* Disables automatic tooltip showing and hiding.
	*
	* @public
	*/
	mute: function () {
		this.setAutoShow(false);
	},

	/**
	* Re-enables automatic tooltip showing and hiding after being muted.
	*
	* @public
	*/
	unmute: function () {
		this.setAutoShow(true);
	},

	/**
	* @private
	*/
	autoShowChanged: function () {
		if (!this.autoShow) {
			this.requestHideTooltip();
		}
	},

	/**
	* @private
	*/
	tap: function () {
		this.requestHideTooltip();
	},

	/**
	* @private
	*/
	requestShowTooltip: function (inSender, inEvent) {
		if (this.autoShow && !Spotlight.isFrozen()) {
			if (inEvent.type == 'onSpotlightFocused' || Spotlight.getPointerMode()) {
				this.waterfallDown('onRequestShowTooltip', {originator: inSender}, this);
			}
		}
	},

	/**
	* @private
	*/
	requestHideTooltip: function () {
		this.waterfallDown('onRequestHideTooltip');
	},

	/**
	* Cancel any pending tooltip showing if the decorator or one of its ancestors is hidden
	*
	* @private
	*/
	showingChangedHandler: function (sender, event) {
		Control.prototype.showingChangedHandler.apply(this, arguments);
		if (!event.showing) {
			this.requestHideTooltip();
		}
	}
});

},{'../Button':'moonstone/Button'}],'moonstone/Panel':[function (module,exports,global,require,request){
/**
* Contains the declaration for the {@link module:moonstone/Panel~Panel} kind.
* @module moonstone/Panel
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	util = require('enyo/utils'),
	dom = require('enyo/dom'),
	Control = require('enyo/Control');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableRows = require('layout/FittableRows'),
	FittableRowsLayout = FittableLayout.Rows;

var
	Spotlight = require('spotlight');

var
	Header = require('moonstone/Header');

/**
* Fires when this [panel]{@link module:moonstone/Panel~Panel} has completed its pre-arrangement transition.
* No additional data is passed with this event.
*
* @event module:moonstone/Panel~Panel#onPreTransitionComplete
* @type {Object}
* @public
*/

/**
* Fires when this [panel]{@link module:moonstone/Panel~Panel} has completed its post-arrangement transition.
* No additional data is passed with this event.
*
* @event module:moonstone/Panel~Panel#onPostTransitionComplete
* @type {Object}
* @public
*/

/**
* {@link module:moonstone/Panel~Panel} is the default kind for controls
* created inside a {@link module:moonstone/Panels~Panels} container. A
* Panels container will typically contain several instances of Panel.
*
* The built-in features include an embedded {@link module:moonstone/Header~Header}
* and a {@link module:layout/FittableRows~FittableRows} layout for the main body
* content.
*
* @class Panel
* @extends module:enyo/Control~Control
* @ui
* @public
*/

module.exports = kind(
	/** @lends module:moonstone/Panel~Panel.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Panel',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/Panel~Panel.prototype
	*/
	published: {
		/**
		* Facade for the [title]{@link module:moonstone/Header~Header#title} property of the embedded
		* {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		title: '',

		/**
		* Facade for the [titleAbove]{@link module:moonstone/Header~Header#titleAbove} property of the
		* embedded {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleAbove: '',

		/**
		* Facade for the [titleBelow]{@link module:moonstone/Header~Header#titleBelow} property of the
		* embedded {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		titleBelow: '',

		/**
		* Facade for the [subTitleBelow]{@link module:moonstone/Header~Header#subTitleBelow} property
		* of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {String}
		* @default ''
		* @public
		*/
		subTitleBelow: '',

		/**
		* When `true`, the header's [titleAbove]{@link module:moonstone/Header~Header#titleAbove} property
		* is automatically populated with the panel index.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		autoNumber: true,

		/**
		* Facade for the [type]{@link module:moonstone/Header~Header#type} property of the embedded
		* {@link module:moonstone/Header~Header}.
		* Valid values are: `'large'`, `'small'`, and `'medium'`.
		*
		* @type {String}
		* @default 'large'
		* @public
		*/
		headerType: 'large',

		/**
		* Facade for the [allowHtml]{@link module:enyo/Control~Control#allowHtml} property of the
		* embedded {@link module:moonstone/Header~Header}.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		allowHtmlHeader: false,

		/**
		* Facade for the [backgroundSrc]{@link module:moonstone/Header~Header#backgroundSrc} property
		* of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {(String|String[]|module:enyo/resolution#selectSrc~src|module:enyo/resolution#selectSrc~src[])}
		* @default null
		* @public
		*/
		headerBackgroundSrc: null,

		/**
		* Facade for the [backgroundPosition]{@link module:moonstone/Header~Header#backgroundPosition}
		* property of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {(String|String[])}
		* @default 'top right'
		* @public
		*/
		headerBackgroundPosition: 'top right',

		/**
		* An object containing additional settings for the {@link module:moonstone/Header~Header}. Any
		* values specified here will be mixed into the header definition.
		*
		* @type {Object}
		* @default null
		* @public
		*/
		headerOptions: null,

		/**
		* Facade for the [titleUpperCase]{@link module:moonstone/Header~Header#titleUpperCase} property
		* of the embedded {@link module:moonstone/Header~Header}.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		titleUpperCase: true
	},

	/**
	* @private
	*/
	handlers: {
		onSpotlightFocus: 'disableSpotlightDummy'
	},

	/**
	* @private
	*/
	spotlight: 'container',

	/**
	* @private
	*/
	classes: 'moon-panel',

	/**
	* @private
	*/
	layoutKind: FittableRowsLayout,

	/**
	* @private
	*/
	useFlex: true,

	/**
	* @private
	*/
	panelTools : [
		/* header will be created here programmatically in createTools after mixing-in headerOptions */
		{name: 'panelBody', kind: FittableRows, fit: true, classes: 'moon-panel-body'},
		{name: 'spotlightDummy', kind: Control, spotlight: false, style: 'width:0; height:0;'}
	],

	/**
	* @private
	*/
	headerConfig : {name: 'header', kind: Header, isChrome: true},

	/**
	* @private
	*/
	bindings: [
		{from: 'title', to: '$.header.title'},
		{from: 'title', to: '$.breadcrumbText.content'},
		{from: 'titleAbove', to: '$.header.titleAbove'},
		{from: 'titleAbove', to: '$.breadcrumbTitleAbove.content'},
		{from: 'titleBelow', to: '$.header.titleBelow'},
		{from: 'subTitleBelow', to: '$.header.subTitleBelow'},
		{from: 'allowHtmlHeader', to: '$.header.allowHtml'},
		{from: 'allowHtmlHeader', to: '$.breadcrumbText.allowHtml'},
		{from: 'headerBackgroundSrc', to: '$.header.backgroundSrc'},
		{from: 'headerBackgroundPosition', to: '$.header.backgroundPosition'},
		{from: 'titleUpperCase', to: '$.header.titleUpperCase'},
		{from: 'headerType', to: '$.header.type', oneWay: false}
	],

	/**
	* @private
	*/
	headerComponents: [],

	/**
	* @private
	*/
	isOffscreen: false,

	/**
	* @private
	*/
	events: {
		onPanelOnscreen: '',
		onPanelOffscreen: ''
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		// FIXME: Need to determine whether headerComponents was passed on the instance or kind to get the ownership correct
		if (this.headerComponents) {
			var owner = this.hasOwnProperty('headerComponents') ? this.getInstanceOwner() : this;
			this.$.header.createComponents(this.headerComponents, {owner: owner});
		}
		this.autoNumberChanged();
		this.headerTypeChanged();
	},

	/**
	* @private
	*/
	initComponents: function () {
		this.createTools();
		this.controlParentName = 'panelBody';
		this.discoverControlParent();
		Control.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	createTools: function () {
		// Create everything but the header
		this.createChrome(this.panelTools);
		// Special-handling for header, which can have its options modified by the instance
		var hc = util.clone(this.headerConfig || {});
		hc.addBefore = this.$.panelBody;
		util.mixin(hc, this.headerOptions || this.headerOption);
		this.createComponent(hc, {owner:this});
	},

	/**
	* On reflow, updates `this.$.contentWrapper` bounds.
	* @private
	*/
	reflow: function () {
		Control.prototype.reflow.apply(this, arguments);
		this.getInitAnimationValues();
		this.updatePanelBodySize();
	},

	/**
	* Updates `this.$.contentWrapper` to have the height/width of `this`.
	* @private
	*/
	updatePanelBodySize: function () {
		var node = this.hasNode();

		if (!node) {
			return;
		}

		this.$.panelBody.applyStyle('height', this.initialHeight + 'px');
	},

	/**
	* Forcibly applies layout kind changes to `this.$.panelBody`.
	* @private
	*/
	layoutKindChanged: function () {
		this.$.panelBody.setLayoutKind(this.layoutKind);
	},

	/**
	* If spottable controls are added to the Panel instance after initial creation, we need to
	* disable the spotlightDummy. Unfortunately, there's no other reliable way to detect when
	* controls are added *anywhere* within a control's component tree so we have to watch for
	* onSpotlightFocus events to disable the spotlightDummy.
	*
	* @private
	*/
	disableSpotlightDummy: function (sender, event) {
		if (this.$.spotlightDummy.spotlight && event.originator !== this && event.originator !== this.$.spotlightDummy) {
			this.$.spotlightDummy.spotlight = false;
		}
	},

	/**
	* @private
	*/
	updateSpotability: function () {
		if (this.isOffscreen) {
			this.spotlightDisabled = true;
		} else {
			this.spotlightDisabled = false;
			this.$.spotlightDummy.spotlight = false;
			if (!Spotlight.isSpottable(this)) {
				// make dummy div spottable if there is no spottable child
				this.$.spotlightDummy.spotlight = true;
			}
		}
	},

	/**
	* @private
	*/
	headerTypeChanged: function () {
		this.$.header.setType(this.headerType);
		this.$.header.adjustTitleWidth();
		if (this.generated) {
			this.resize();
		}
	},

	/**
	* Updates [titleAbove]{@link module:moonstone/Panel~Panel#titleAbove} when
	* [autoNumber]{@link module:moonstone/Panel~Panel#autoNumber} changes.
	* @private
	*/
	autoNumberChanged: function () {
		if (this.getAutoNumber() === true && this.container) {
			// This gets the index regardless of whether the panel is client or chome
			var n = this.parent.indexOfChild(this) + 1;
			n = ((n < 10) ? '0' : '') + n;
			this.setTitleAbove(n);
		}
	},

	/**
	* @private
	*/
	enableMarquees: function () {
		this.$.header.enableMarquee();
	},

	/**
	* @private
	*/
	disableMarquees: function () {
		this.$.header.disableMarquee();
	},

	/**
	* @private
	*/
	startMarqueeAsNeeded: function (info) {
		var onscreen = !info.isOffscreen;
		if (onscreen) {
			this.$.header.enableMarquee();
			this.$.header.startMarquee();
		}
	},

	/**
	* @private
	*/
	getHeader: function () {
		return this.$.header;
	},

	/**
	* Called directly by {@link module:moonstone/Panels~Panels}.
	* @private
	*/
	initPanel: function (info) {
		this.set('isOffscreen', info.isOffscreen);
		this.updateSpotability();
		this.disableMarquees();
		this.startMarqueeAsNeeded(info);
	},

	/**
	* Called directly by {@link module:moonstone/Panels~Panels}.
	* @private
	*/
	updatePanel: function (info) {
		if (!info.animate) {
			this.disableMarquees();
		}

		this.set('isOffscreen', info.isOffscreen);
		this.updateSpotability();
		this.startMarqueeAsNeeded(info);
	},

	/**
	* Called directly on the panel by {@link module:moonstone/Panels~Panels} when the panel has completed a
	* transition. You may override this function in a panel subkind to perform
	* post-transition work (e.g., loading data for the panel).
	*
	* @param {Object} info - Information from the [Panels]{@link module:moonstone/Panels~Panels} component.
	* Additional information may be supplied by the arranger, such as breadcrumb and
	* offscreen status.
	* @param {Number} info.from - The index the parent Panels was moving from for this transition.
	* @param {Number} info.to - The index the parent Panels was moving to for this transition.
	* @param {Number} info.index - The current index of this [panel]{@link module:moonstone/Panel~Panel}.
	* @param {Boolean} info.animate - Whether the parent Panels is set to animate.
	* @public
	*/
	transitionFinished: function (info) {
		this.updatePanel(info);
	},

	/**
	* @private
	*/
	isOffscreenChanged: function () {
		// Tell the children we're on or off screen
		if (this.isOffscreen) {
			this.waterfallDown('onPanelOffscreen');
		} else {
			this.waterfallDown('onPanelOnscreen');
		}
	},

	/**
	* Was protected
	* @private
	*/
	getInitAnimationValues: function () {
		var panelNode = this.hasNode(), headerNode = this.$.header.hasNode(), bodyNode = this.$.panelBody.hasNode(),
			panelPaddingT = parseInt(dom.getComputedStyleValue(panelNode, 'padding-top'), 10),
			panelPaddingB = parseInt(dom.getComputedStyleValue(panelNode, 'padding-bottom'), 10),
			bodyPaddingT = parseInt(dom.getComputedStyleValue(bodyNode, 'padding-top'), 10),
			panelHeight = panelNode.getBoundingClientRect().height,
			headerHeight = headerNode.getBoundingClientRect().height;
		this.initialHeight = panelHeight - headerHeight - (panelPaddingT + panelPaddingB + bodyPaddingT);
	},

	// Accessibility

	/**
	* @private
	*/
	accessibilityRole: 'region',

	/**
	* @private
	*/
	ariaObservers: [
		{path: ['title', 'accessibilityLabel', 'accessibilityHint'], method: function () {
			var content = this.title,
				prefix = this.accessibilityLabel || content || null,
				label = this.accessibilityHint && prefix && (prefix + ' ' + this.accessibilityHint) ||
						this.accessibilityHint ||
						this.accessibilityLabel ||
						prefix ||
						null;

			this.setAriaAttribute('aria-label', label);
		}}
	],

	/**
	* @private
	*/
	accessibilityLive: 'off'
});

}],'moonstone/ApplicationCloseButton':[function (module,exports,global,require,request){
require('moonstone');

/**
* Contains the declaration for the {@link module:moonstone/ApplicationCloseButton~ApplicationCloseButton} kind.
* @module moonstone/ApplicationCloseButton
*/

var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	ri = require('enyo/resolution');

var
	$L = require('../i18n'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	Tooltip = require('moonstone/Tooltip'),
	IconButton = require('moonstone/IconButton');

var buttonDescription = $L('Exit app');

/**
* {@link module:moonstone/ApplicationCloseButton~ApplicationCloseButton}
* may be added to {@link module:moonstone/Panels~Panels}, or other
* full-screen controls. It includes basic positioning styles that may require
* adjustment for your particular usage. When activated, an `onApplicationClose`
* event is emitted. On its own, an ApplicationCloseButton has no function; you
* must provide your own event handler to close the application. The recommended
* action to take in response to the event is `window.close()`, but you may also
* want to also perform operations such as saving user work or closing database
* connections.
*
* @class ApplicationCloseButton
* @extends module:moonstone/TooltipDecorator~TooltipDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/ApplicationCloseButton~ApplicationCloseButton.prototype */ {
	/**
	* @private
	*/
	name: 'moon.ApplicationCloseButton',

	/**
	* @private
	*/
	kind: TooltipDecorator,

	/**
	* @private
	*/
	classes: 'moon-application-close-button',

	/**
	* Boolean indicating whether the tooltip is shown soon after the button is focused.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	autoShow: false,

	/**
	* @private
	*/
	events: {
		onApplicationClose: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'button', kind: IconButton, icon: 'closex', small: true, backgroundOpacity: 'transparent', ontap: 'handleButtonTap'},
		{kind: Tooltip, content: buttonDescription, floating: true, position: 'below'}
	],

	handlers: {
		onCustomizeCloseButton: 'handleCustomizeCloseButton'
	},

	/**
	* @private
	*/
	customizeCloseButton: function (properties) {
		var prop, style;

		if (properties && typeof properties == 'object') {
			for (prop in properties) {
				if (prop == 'styles' && typeof properties[prop] == 'object') {
					for (style in properties[prop]) {
						this.$.button.applyStyle(style, properties[prop][style]);
					}
				} else {
					this.$.button.set(prop, properties[prop]);
				}
			}
		}
	},

	/**
	* This takes action when the CustomizeCloseButton event is received. It accepts several event
	* properties, and in their absence resets each to its original value.
	*
	* Possible `ev` object members:
	*   x - (Number|String), positive or negative measurement to offset the X from its natural position.
	*       This value is automatically inverted in RtL mode.
	*   y - (Number|String), positive or negative measurement to offset the X from its natural position.
	*   properties {Object} An object containing key/value pairs to be `set` on the close button.
	*   For example, this can be used to set the `showing` property of the close button. If present
	*   and an object, the `styles` member will be iterated through and each style will be applied
	*   individually and those styles with a `null` value will be removed.
	*
	* Ex:
	*    this.doCustomizeCloseButton({parameters: {showing: false});
	*
	* @private
	*/
	handleCustomizeCloseButton: function (sender, ev) {
		var shiftX = ev.x,
			shiftY = typeof ev.y == 'number' ? dom.unit(ri.scale(ev.y), 'rem') : ev.y;

		switch (typeof shiftX) {
			case 'number':
				shiftX = dom.unit(ri.scale( this.rtl ? shiftX * -1 : shiftX ), 'rem');
				break;
			case 'string':
				if (this.rtl) {
					if (shiftX.indexOf('-') === 0) {
						shiftX = shiftX.substring(1);
					} else {
						shiftX = '-' + shiftX;
					}
				}
				break;
		}
		// Only apply changes that are present. (Undef means don't change me.) dom.transform preserves successive assignments.
		if (typeof shiftX != 'undefined') dom.transform(this, {translateX: shiftX});
		if (typeof shiftY != 'undefined') dom.transform(this, {translateY: shiftY});

		this.customizeCloseButton(ev.properties);
		return true;
	},

	/**
	* @private
	*/
	create: function () {
		TooltipDecorator.prototype.create.apply(this, arguments);
		this.autoShowChanged();
	},

	/**
	* @private
	*/
	autoShowChanged: function () {
		TooltipDecorator.prototype.autoShowChanged.apply(this, arguments);
		// Only add an accessibilityLabel to the button if we aren't displaying a tooltip, so the
		// accessibility system doesn't read the label twice, once for the button, and again for the tooltip.
		this.$.button.set('accessibilityLabel', this.autoShow ? null : buttonDescription);
	},

	/**
	* @private
	*/
	handleButtonTap: function (sender, ev) {
		this.doApplicationClose();
	}
});

},{'../i18n':'moonstone/i18n'}],'moonstone/Panels':[function (module,exports,global,require,request){
/**
* Contains the declaration for {@link module:moonstone/Panels~Panels} and supporting kinds.
* @module moonstone/Panels
*/

require('moonstone');

var
	kind = require('enyo/kind'),
	dispatcher = require('enyo/dispatcher'),
	dom = require('enyo/dom'),
	util = require('enyo/utils'),
	Control = require('enyo/Control'),
	EnyoHistory = require('enyo/History'),
	Signals = require('enyo/Signals'),
	ri = require('enyo/resolution'),
	ViewPreloadSupport = require('enyo/ViewPreloadSupport');

var
	Panels = require('layout/Panels');

var
	Spotlight = require('spotlight');

var
	$L = require('../i18n');

var
	ApplicationCloseButton = require('../ApplicationCloseButton'),
	HistorySupport = require('../HistorySupport'),
	MoonAnimator = require('../MoonAnimator'),
	MoonArranger = require('../MoonArranger'),
	MoonOptions = require('../options'),
	Panel = require('../Panel'),
	StyleAnimator = require('../StyleAnimator');

/**
* {@link module:moonstone/Panels~PanelsHandle} is a helper kind for
* {@link module:moonstone/Panels~Panels}. It implements a spottable handle
* that the user may interact with to hide and show the `moonstone/Panels`
* control.
*
* @class PanelsHandle
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var PanelsHandle = kind(
	/** @lends module:moonstone/Panels~PanelsHandle.prototype */ {

	/**
	* @private
	*/
	name: 'moon.PanelsHandle',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	mixins: [HistorySupport],

	/*
	* @private
	*/
	classes: 'moon-panels-handle',

	/**
	* @private
	*/
	handlers: {
		ontap: 'handleTap'
	},

	/**
	* @private
	*/
	handleTap: function () {
		if (!EnyoHistory.isProcessing()) {
			this.pushBackHistory();
		}
	},

	/**
	* @private
	*/
	backKeyHandler: function () {
		this.bubble('ontap');
		return true;
	},

	/**
	* We override getAbsoluteShowing so that the handle's spottability is not dependent on the
	* showing state of its parent, the {@link module:moonstone/Panels~Panels} control.
	*
	* @private
	*/
	getAbsoluteShowing: function (ignoreBounds) {
		var bounds = !ignoreBounds ? this.getBounds() : null;

		if (!this.generated || this.destroyed || !this.showing || (bounds &&
			bounds.height === 0 && bounds.width === 0)) {
			return false;
		}

		return true;
	}
});

/**
* {@link module:moonstone/Panels~Breadcrumb} is a helper kind for
* {@link module:moonstone/Panels~Panels}. It implements a breadcrumb that
* displays the panel index.
*
* @class Breadcrumb
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var Breadcrumb = kind(
	/** @lends module:moonstone/Panels~Breadcrumb.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Breadcrumb',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	* @lends module:moonstone/Panels~Breadcrumb.prototype
	*/
	published: {
		/*
		* @private
		*/
		index: 0
	},

	/**
	* @private
	*/
	spotlight: true,

	/**
	* @private
	*/
	isOffscreen: false,

	/**
	* @private
	*/
	accessibilityLabel: $L('go to previous'),

	/**
	* @private
	*/
	handlers: {
		ontap: 'tapHandler',
		onSpotlightRight: 'rightHandler'
	},

	/**
	* @private
	*/
	classes: 'moon-panels-breadcrumb',

	/**
	* @private
	*/
	components: [
		{name: 'number', kind: Control, classes: 'moon-panels-breadcrumb-header'}
	],

	/**
	* @private
	*/
	bindings: [
		{from: 'index', to: '$.number.content', transform: 'formatNumber'}
	],

	/**
	* @private
	*/
	formatNumber: function (n) {
		var i=n+1;
		return '< ' + ((i < 10) ? '0' : '') + i;
	},

	/**
	* @private
	*/
	tapHandler: function (sender, event) {
		// decorate
		event.breadcrumbTap = true;
		event.index = this.index;
	},

	/**
	* @private
	*/
	rightHandler: function(sender, event) {
		var panels = this.owner;
		if (this.index+1 ==	panels.index) {
			Spotlight.spot(panels.getActive());
			return true;
		}
	},

	/**
	* @private
	*/
	updateSpotability: function () {
		this.spotlightDisabled = this.isOffscreen;
	},

	/**
	* @private
	*/
	updateBreadcrumb: function (info) {
		this.set('isOffscreen', info.isOffscreen);
		this.updateSpotability();
	}
});


/**
* {@link module:moonstone/Panels~Panels} extends {@link module:layout/Panels~Panels},
* adding support for 5-way focus (Spotlight) and pre-configured Moonstone panels
* design patterns. By default, controls added to a Panels container are instances
* of {@link module:moonstone/Panel~Panel}.
*
* `moonstone/Panels` introduces the concept of patterns for panel display.
* Set [pattern]{@link module:moonstone/Panels~Panels#pattern} to `'activity'`
* or `'alwaysViewing'` to use one of two patterns designed for apps on Smart TV systems.
*
* @class Panels
* @extends module:layout/Panels~Panels
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:moonstone/Panels~Panels.prototype */ {

	/**
	* @private
	*/
	name: 'moon.Panels',

	/**
	* @private
	*/
	kind : Panels,

	/**
	* @private
	*/
	mixins : [HistorySupport, ViewPreloadSupport],

	/**
	* @private
	*/
	classes : 'moon-panels enyo-fit',

	/**
	* @private
	*/
	spotlightDecorate : false,

	/**
	* @private
	* @lends module:moonstone/Panels~Panels.prototype
	*/
	published: {
		/**
		* A convenience property for configuring {@link module:moonstone/Panels~Panels} according to a
		* particular design pattern.  Valid values are `'none'` (default), `'activity'`,
		* and `'alwaysviewing'`. Note that this property may only be set at creation
		* time, and should not be changed at runtime.
		*
		* The `'alwaysviewing'` pattern uses the {@link module:moonstone/BreadcrumbArranger~BreadcrumbArranger} with
		* semi-transparent panels (depending on the color theme) over the right half
		* of the screen, allowing multiple breadcrumbs to accumulate on the left
		* half of the screen.
		*
		* The `'activity'` pattern  uses the `BreadcrumbArranger` with opaque
		* panels over the full screen and only one breadcrumb showing onscreen.
		*
		* The `'none'` pattern should be used when selecting other arrangers, such as
		* {@link module:layout/CarouselArranger~CarouselArranger} or {@link module:layout/CardArranger~CardArranger}.
		*
		* @type {String}
		* @default 'none'
		* @public
		*/
		pattern: 'none',

		/**
		* When [useHandle]{@link module:moonstone/Panels~Panels#useHandle} is used, it is automatically
		* hidden after this amount of time (in milliseconds).
		*
		* @type {Number}
		* @default 4000
		* @public
		*/
		autoHideTimeout: 4000,

		/**
		* When `true`, a handle is created to allow the user to control the showing
		* state of the panels using animation. When `false`, no handle is created and
		* panels may only be hidden/shown programmatically with no animation.
		* When `'auto'` (the default), `useHandle` is set to `true` if the
		* [pattern]{@link module:moonstone/Panels~Panels#pattern} is `'alwaysviewing'` and to `false` if
		* the `pattern` is `'activity'`. Note that this property may only be set at
		* creation time, and should not be changed at runtime. This property
		* only has an effect when using the `'activity'` or `'alwaysviewing'` pattern.
		*
		* @type {String|Boolean}
		* @default 'auto'
		* @public
		*/
		useHandle: 'auto',

		/**
		* Dynamically controls whether the handle is showing.
		* When `true` (the default), the handle is shown and panels may be shown by
		* activating the handle and hidden by re-activating the handle or by tapping
		* outside the panel area. When `false`, the handle is hidden and panels may
		* only be shown or hidden programmatically using the
		* [showing]{@link module:enyo/Control~Control#showing} property or the
		* [show()]{@link module:enyo/Control~Control#show}/[hide()]{@link module:enyo/Control~Control#hide} API.
		* This property only has an effect when [useHandle]{@link module:moonstone/Panels~Panels#useHandle}
		* is `true` (or `'auto'`, resulting in `true`).
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		handleShowing: true,

		/**
		* When `true`, panels are automatically popped when the user moves back.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		popOnBack: false,

		/**
		* When `true`, an ApplicationCloseButton is added to ActivityPanels arranger's Panel Headers.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		hasCloseButton: true,

		/**
		* When `true`, navigating the panel-stack (forward and backward) by 5-way key is disabled.
		* This feature may be helpful to prevent accidental navigation in "wizard" interface
		* scenarios where the user must take explicit action to advance or regress.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		preventKeyNavigation: false,

		/**
		* When `true`, focus can move from panel to breadcrumb when press left key.
		*
		* @type {Boolean}
		* @default true
		* @deprecated This property will be removed in the future.
		* @public
		*/
		leftKeyToBreadcrumb: true,

		/**
		* When `true`, existing views are cached for reuse; otherwise, they are destroyed.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		cacheViews: false
	},

	/**
	* @private
	*/
	narrowFit: false,

	/**
	* @private
	*/
	fractions: {panel: 1, breadcrumb: 1},

	/**
	* @private
	*/
	handlers: {
		ontap:						'tapped',
		onSpotlightUp:				'spotlightUp',
		onSpotlightDown:			'spotlightDown',
		onSpotlightRight:			'spotlightRight',
		onSpotlightLeft:			'spotlightLeft',
		onSpotlightFocus:			'spotlightFocus',
		onSpotlightContainerLeave:	'onSpotlightPanelLeave',
		onSpotlightContainerEnter:	'onSpotlightPanelEnter',
		onCustomizeCloseButton:		'handleCustomizeCloseButton'
	},

	/**
	* @private
	*/
	applicationTools: [
		{name: 'appClose', kind: ApplicationCloseButton, onSpotlightUp: 'spotlightFromCloseButton', onSpotlightDown: 'spotlightFromCloseButton', onSpotlightRight: 'spotlightFromCloseButton', onSpotlightLeft: 'spotlightFromCloseButton'}
	],

	/**
	* @private
	*/
	handleTools: [
		{name: 'backgroundScrim', kind: Control, classes: 'moon-panels-background-scrim'},
		{name: 'clientWrapper', kind: Control, classes: 'enyo-fill moon-panels-client-wrapper', components: [
			{name: 'scrim', kind: Control, classes: 'moon-panels-panel-scrim'},
			{name: 'breadcrumbs', kind: Control, classes: 'moon-panels-breadcrumbs'},
			{name: 'panelsViewport', kind: Control, classes: 'moon-panels-viewport', components: [
				{name: 'client', kind: Control, tag: null}
			]}
		]},
		{name: 'showHideHandle', kind: PanelsHandle, classes: 'hidden', canGenerate: false, ontap: 'handleTap', onSpotlightLeft: 'handleSpotLeft', onSpotlightRight: 'handleSpotRight', onSpotlightFocused: 'handleFocused', onSpotlightBlur: 'handleBlur', tabIndex: -1},
		{name: 'showHideAnimator', kind: StyleAnimator, onComplete: 'showHideAnimationComplete'}
	],

	/**
	* @private
	*/
	animatorTools: [
		{name: 'animator', kind: MoonAnimator, onStep: 'step', useBezier: true, onEnd: 'animationEnded', configs: {
			panel: {
				forward: { startValue: 0, endValue: 1, delay: 0, duration: 230, bezier: [0.69,0.01,0.97,0.59]},
				backward: { startValue: 0, endValue: 1, delay: 0, duration: 300, bezier: [0.06,0.53,0.38,0.99] }
			},
			breadcrumb: {
				forward: { startValue: 0, endValue: 1, delay: 230, duration: 70, bezier: [0.46,0.28,0.76,0.57] },
				backward: { startValue: 0, endValue: 1, delay: 150, duration: 150, bezier: [0.08,0.51,0.24,0.99] }
			}
		}}
	],

	/**
	* @private
	*/
	defaultKind: Panel,

	/**
	* When `false`, dragging is disabled.
	*
	* @private
	*/
	draggable: false,

	/**
	* Default to using `BreadcrumbArranger`.
	*
	* @private
	*/
	arrangerKind: MoonArranger,

	/**
	* Index of panel set in the middle of transition.
	*
	* @private
	*/
	queuedIndex: null,

	/**
	* Flag for blocking consecutive push/pop/replace panel actions to protect
	* create/render/destroy time.
	*
	* @private
	*/
	isModifyingPanels: false,

	/**
	* Flag to indicate if the Panels are currently transitioning to a new index.
	*
	* @private
	*/
	transitioning: false,

	/**
	* Width of breadcrumb.
	*
	* @private
	*/
	breadcrumbWidth: 96,

	/**
	* Checks the state of panel transitions.
	*
	* @return {Boolean} `true` if a transition between panels is currently in progress;
	* otherwise, `false`.
	* @public
	*/
	inTransition: function () {
		return this.transitioning;
	},

	/**
	* Returns list of breadcrumb objects
	*
	* @return {Array} List of breadcrumbs.
	* @public
	*/
	getBreadcrumbs: function () {
		return this.$.breadcrumbs ? this.$.breadcrumbs.children : [];
	},

	/**
	* Returns reference to breadcrumb at the specified index.
	*
	* @public
	*/
	getBreadcrumbForIndex: function (index) {
		var breadcrumbs = this.getBreadcrumbs();
		return breadcrumbs[(index + breadcrumbs.length) % breadcrumbs.length];
	},

	/**
	* Returns maximum number of breadcrumbs that can be fit in the breadcrumb area.
	*
	* @return {Number} Number of breadcrumbs.
	* @public
	*/
	getBreadcrumbMax: function () {
		if (this.pattern == 'activity') return 1;
		// Always viewing pattern is using half screen to show breadcrumbs
		return Math.round(window.innerWidth / 2 / ri.scale(this.breadcrumbWidth));
	},

	/**
	* Returns range of breadcrumb index.
	*
	* @return {Object} Object contains start and end value as a hash. '{start: start, end: end}'
	* @public
	*/
	getBreadcrumbRange: function () {
		/** To support fly weight pattern, we use a concept of a window.
		*	If we are seeing maximum 1 breadcrumb on screen (case of activity pattern),
		*	we arrange 2 breadcrumbs at a time (current and previous) to show animation.
		*	If we move forward from index 2 to 3 (active is 3), the window can be [2, 3].
		*/
		var end = this.index,
			start = end - this.getBreadcrumbs().length;

		// If we move backward from index 4 to 3 (active is 3), the window can be [3, 4].
		if (this.fromIndex > this.toIndex) {
			start = start+1;
			end = end+1;
		}
		return {start: start, end: end};
	},

	/**
	* We just recalculate transition position on pushPanel, because reflow is high cost operation.
	* @private
	*/
	recalcLayout: function () {
		if (this.layout && this.layout.calcTransitionPositions) {
			this.arrangements = [];
			this.layout.calcTransitionPositions();
		} else {
			this.reflow();
		}
	},

	/**
	* Determines the id of the given view.
	*
	* @param {Object} view - The view whose id we will determine.
	* @return {String} The id of the given view.
	* @public
	*/
	getViewId: function (view) {
		return view.id;
	},

	/**
	* Retrieves an array of either cached panels, if found, or creates a new array of panels
	*
	* @param {Object[]} info - The declarative {@glossary kind} definitions.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @return {Array} List of found or created controls
	* @private
	*/
	createPanels: function (info, moreInfo) {
		var newPanels = [],
			newPanel, idx;

		for (idx = 0; idx < info.length; idx++) {
			newPanel = this.createPanel(info[idx], moreInfo);
			newPanels.push(newPanel);
		}

		return newPanels;
	},

	/**
	* Retrieves a cached panel or, if not found, creates a new panel
	*
	* @param {Object} info - The declarative {@glossary kind} definition.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @return {Object} - Found or created control
	* @private
	*/
	createPanel: function (info, moreInfo) {
		var panel,
			panelId = this.getViewId(info);

		if (this.cacheViews && panelId) {
			panel = this.restoreView(panelId);
		}

		panel = panel || this.createComponent(info, moreInfo);
		return panel;
	},

	/**
	* Creates a panel on top of the stack and increments index to select that component.
	*
	* @param {Object} info - The declarative {@glossary kind} definition.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @return {Object} The instance of the panel that was created on top of the stack.
	* @public
	*/
	pushPanel: function (info, moreInfo) { // added
		var startingPanelCount, lastIndex, panel;

		if (this.transitioning || this.isModifyingPanels) return null;

		this.isModifyingPanels = true;

		startingPanelCount = this.getPanels().length;
		lastIndex = startingPanelCount - 1;
		panel = this.createPanel(info, moreInfo);

		panel.render();
		this.addBreadcrumb(true);
		this.recalcLayout();
		panel.resize();
		this.setIndex(lastIndex+1);

		// when we push the first panel, we need to explicitly let our observers know about this as
		// there would not be a change in actual index value
		if (startingPanelCount === 0) {
			// Accessibility - when we push the first panel, we need to set alert role for reading title.
			if (MoonOptions.accessibility) {
				this.setAlertRole();
			}
			this.notifyObservers('index');
		}

		this.isModifyingPanels = false;

		return panel;
	},

	/**
	* Options for the [Panels.pushPanels()]{@link module:moonstone/Panels~Panels.pushPanels} method.
	*
	* @typedef {Object} module:moonstone/Panels~Panels.pushPanels~options
	* @property {Number} targetIndex - The panel index number to immediately switch to. Leaving
	*	this blank or not setting it will perform the default action, which transitions to the
	*	first of the new panels. Setting this to a negative and other 'out of bounds' values
	*	work in conjunction with the `wrap: true` property. Negative values count backward from
	*	the end, while indices greater than the total Panels' panel length wrap around and start
	*	counting again from the beginning.
	* @property {Boolean} transition - Whether to transition or jump directly to the next panel.
	* @public
	*/

	/**
	* Creates multiple panels on top of the stack and updates index to select the last one
	* created. Supports an optional `options` object as the third parameter.
	*
	* @param {Object[]} info - The declarative {@glossary kind} definitions.
	* @param {Object} commonInfo - Additional properties to be applied (defaults).
	* @param {Object} options - Additional options for pushPanels.
	* @return {null|Object[]} Array of the panels that were created on top of the stack, or
	*	`null` if panels could not be created.
	* @public
	*/
	pushPanels: function (info, commonInfo, options) { // added
		var startingPanelCount, lastIndex, panels, panel;

		if (this.transitioning || this.isModifyingPanels) return null;

		this.isModifyingPanels = true;

		if (!options) options = {};

		startingPanelCount = this.getPanels().length;
		lastIndex = startingPanelCount;
		panels = this.createPanels(info, commonInfo);

		for (panel = 0; panel < panels.length; ++panel) {
			panels[panel].render();
		}
		this.addBreadcrumb(true);
		this.recalcLayout();
		if (options.targetIndex || options.targetIndex === 0) {
			lastIndex = options.targetIndex;
		}
		lastIndex = this.clamp(lastIndex);
		for (panel = 0; panel < panels.length; ++panel) {
			panels[panel].resize();
		}
		// If transition was explicitly set to false, since null or undefined indicate 'never set' or unset
		if (options.transition === false) {
			this.setIndexDirect(lastIndex);
		} else {
			this.setIndex(lastIndex);
		}

		// when we push the first panel, we need to explicitly let our observers know about this as
		// there would not be a change in actual index value
		if (startingPanelCount === 0) {
			// Accessibility - when we push the first panel, we need to set alert role for reading title.
			if (MoonOptions.accessibility) {
				this.setAlertRole();
			}
			this.notifyObservers('index');
		}

		this.isModifyingPanels = false;

		return panels;
	},

	/**
	* Destroys panels whose index is greater than or equal to a specified value.
	*
	* @param {Number} index - Index at which to start removing panels.
	* @param {Number} [direction] - The direction in which we are changing indices. A negative
	*	value signifies that we are moving backwards, and want to remove panels whose indices are
	*	greater than the current index. Conversely, a positive value signifies that we are moving
	*	forwards, and panels whose indices are less than the current index should be removed. To
	*	maintain backwards-compatibility with the existing API, this parameter is optional and, if
	*	not specified, will default to the popOnBack behavior.
	* @public
	*/
	popPanels: function (index, direction) {
		if (this.transitioning || this.isModifyingPanels) return;

		var panels = this.getPanels(),
			i;

		this.isModifyingPanels = true;

		if (direction > 0) {
			for (i = 0; i <= index; ++i) {
				this.removePanel(panels[i], true);
			}
		} else {
			index = index || panels.length - 1;

			for (i = panels.length - 1; i >= index; i--) {
				this.removePanel(panels[i]);
			}
		}

		this.removeBreadcrumb();
		this.recalcLayout();
		this.isModifyingPanels = false;
	},

	/**
	* Removes an individual panel.
	*
	* @param {Object} panel - The panel to remove.
	* @param {Boolean} [preserve] - If {@link module:moonstone/Panels~Panels#cacheViews} is `true`,
	*	this value is used to determine whether or not to preserve the current panel's position in
	*	the component hierarchy and on the screen, when caching.
	* @private
	*/
	removePanel: function (panel, preserve) {
		if (panel) {
			if (this.cacheViews) {
				this.cacheView(panel, preserve);
			} else {
				panel.destroy();
			}
		}
	},

	/**
	* Destroys specified panel and creates new panel in-place without transition effect.
	*
	* @param {Number} index - Index of panel to destroy.
	* @param {Object} info - The declarative {@glossary kind} definition.
	* @param {Object} moreInfo - Additional properties to be applied (defaults).
	* @public
	*/
	replacePanel: function (index, info, moreInfo) {
		if (this.transitioning || this.isModifyingPanels) {return;}
		this.isModifyingPanels = true;
		var oPanel = null;

		if (this.getPanels().length > index) {
			this.getPanels()[index].destroy();
			if (this.getPanels().length > index) {
				moreInfo = util.mixin({addBefore: this.getPanels()[index]}, moreInfo);
			}
		}
		oPanel = this.createPanel(info, moreInfo);
		oPanel.render();
		this.resize();
		this.isModifyingPanels = false;
	},

	/**
	* Finds and returns the panel index of the passed-in control. Returns `-1` if
	* panel is not found.
	*
	* @param {Object} oControl - A control to look for.
	* @return {Number} Panel index of control, or `-1` if panel is not found.
	* @public
	*/
	getPanelIndex: function (oControl) {
		var oPanel = null;

		while (oControl && oControl.parent) {
			// Parent of a panel can be a client or a panels.
			if (oControl.parent === this.$.client || oControl.parent === this) {
				oPanel = oControl;
				break;
			}
			oControl = oControl.parent;
		}

		if (oPanel) {
			for (var n=0; n<this.getPanels().length; n++) {
				if (this.getPanels()[n] == oPanel) {
					return n;
				}
			}
		}

		return -1;
	},

	/**
	* Returns `true` if the passed-in control is a child panel of this Panels instance.
	*
	* @param {Object} control - A panel control.
	* @return {Boolean} `true` if the specified control is a child panel of this Panels
	* instance.
	* @public
	*/
	isPanel: function (control) {
		for (var n=0; n<this.getPanels().length; n++) {
			if (this.getPanels()[n] == control) {
				return true;
			}
		}
	},

	/**
	* @private
	*/
	refresh: function () {
		if (this.isMoonAnimatorUsed) {
			for(var k in this.$.animator.configs) {
				this.fractions[k] = 1;
			}
		}
		Panels.prototype.refresh.apply(this, arguments);
	},

	/**
	* @private
	*/
	step: function (sender) {
		if (this.isMoonAnimatorUsed) {
			for(var k in this.$.animator.configs) {
				this.fractions[k] = sender.values[k];
			}
		}
		Panels.prototype.step.apply(this, arguments);
		return true;
	},

	/**
	* @private
	*/
	stepTransition: function () {
		if (!this.hasNode()) return;

		if (this.isMoonAnimatorUsed) {
			this.arrangement = this.arrangement ? this.arrangement : {};
			for(var k in this.$.animator.configs) {
				this.arrangement[k] = this.interpolatesArrangement(this.fractions[k]);
			}
			if (this.layout && this.arrangement.panel && this.arrangement.breadcrumb) {
				this.layout.flowArrangement();
			}
		} else {
			Panels.prototype.stepTransition.apply(this, arguments);
		}
	},

	/**
	* Interpolates between arrangements as needed.
	*
	* @param {Number} [fraction] - A value between 0 to 1.
	* @private
	*/
	interpolatesArrangement: function (fraction) {
		// select correct transition points and normalize fraction.
		var t$ = this.transitionPoints;
		var r = (fraction || 0) * (t$.length-1);
		var i = Math.floor(r);
		r = r - i;
		var s = t$[i], f = t$[i+1];
		// get arrangements and lerp between them
		var s0 = this.fetchArrangement(s);
		var s1 = this.fetchArrangement(f);
		return s0 && s1 ? Panels.lerp(s0, s1, r) : (s0 || s1);
	},

	/**
	* @method
	* @private
	*/
	create: function () {
		Panels.prototype.create.apply(this, arguments);
		this.set('animate', this.animate && MoonOptions.accelerate, true);

		// we need to ensure our handler has the opportunity to modify the flow during
		// initialization
		this.showingChanged();
		// make other panel to spotlightDisabled without the initialPanel;
		this.notifyPanels('initPanel');
	},

	/**
	* @private
	*/
	initComponents: function () {
		this.applyPattern();
		Panels.prototype.initComponents.apply(this, arguments);
		this.isMoonAnimatorUsed = (this.$.animator instanceof MoonAnimator);
		this.addBreadcrumb();
		this.initializeShowHideHandle();
		this.handleShowingChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Panels.prototype.rendered.apply(this, arguments);

		this.notifyBreadcrumbs('updateBreadcrumb');

		// Direct hide if not showing and using handle
		if (this.useHandle === true) {
			if (this.showing) {
				this._directShow();
			} else {
				this._directHide();
			}
		}
	},

	/**
	* @private
	*/
	tapped: function (oSender, oEvent) {
		if (oEvent.originator === this.$.showHideHandle || this.pattern === 'none' ||
			this.transitioning === true || this.isModifyingPanels === true) {
			return;
		}

		// If tapped on breadcrambs area (which is located in the left side of panel)
		if (oEvent.originator === this.$.breadcrumbs) {
			if (this.showing && (this.useHandle === true) && this.handleShowing) {
				this.hide();
			}
		} else {
			// If tapped on breadcrumb, go to that panel
			if (oEvent.breadcrumbTap && oEvent.index !== this.getIndex()) {
				this.setIndex(oEvent.index);
			}
		}
	},

	/**
	* This takes action when the CustomizeCloseButton event is received. It accepts several event
	* properties, and in their absence resets each to its original value.
	*
	* Values:
	*   x - (Number|String), positive or negative measurement to offset the X from its natural position.
	*       This value is automatically inverted in RtL mode.
	*   y - (Number|String), positive or negative measurement to offset the X from its natural position.
	*   properties {Object} An object containing key/value pairs to be `set` on the close button.
	*   For example, this can be used to set the `showing` property of the close button. If present
	*   and an object, the `styles` member will be iterated through and each style will be applied
	*   individually and those styles with a `null` value will be removed.
	*
	* Ex:
	*    this.doCustomizeCloseButton({parameters: {showing: false});
	*
	* @private
	*/
	handleCustomizeCloseButton: function (sender, ev) {
		if (this.$.appClose) {
			this.$.appClose.handleCustomizeCloseButton.apply(this.$.appClose, arguments);
		}
	},

	/**
	* Given a direction and starting control, walks up the lineage chain until a suitable control to
	* spot has been found.
	*
	* @param {String} dir - The direction of movement.
	* @param {Object} control - The starting control.
	* @returns {Object} The target that should be spotted.
	* @private
	*/
	getSpotlightTarget: function (dir, control) {
		var ref = control,
			target,
			parent,
			ext;

		// Look at all of the NearestNeighbors up the lineage chain, until we find a good one.
		while (!target) {
			if (!ref || ref instanceof Panel) break;
			parent = Spotlight.getParent(ref);
			// Add app close button as a child of Panel
			if (this.hasCloseButton && parent instanceof Panel) {
				ext = {extraCandidates: this.$.appClose};
			}
			target = Spotlight.NearestNeighbor.getNearestNeighbor(dir, ref, ext);
			ref = parent;
			ext = null;
		}

		return target;
	},

	/**
	* Considers whether or not the application close button should be spotted, and spots
	* accordingly, based on the given movement direction and originating control.
	*
	* @param {String} dir - The direction of movement.
	* @param {Object} orig - The originating control.
	* @returns {Boolean} If `true`, the application close button has been spotted; otherwise,
	*	`false` is returned.
	* @private
	*/
	considerSpottingCloseButton: function (dir, orig) {
		var target;

		target = this.getSpotlightTarget(dir, orig);

		if (target && target.parent instanceof ApplicationCloseButton) {
			Spotlight.spot(target);
			return true;
		}

		return false;
	},

	/**
	* @private
	*/
	spotlightUp: function (sender, ev) {
		return this.considerSpottingCloseButton('UP', ev.originator);
	},

	/**
	* @private
	*/
	spotlightDown: function (sender, ev) {
		return this.considerSpottingCloseButton('DOWN', ev.originator);
	},

	/**
	* @private
	*/
	spotlightLeft: function (sender, ev) {
		if (!this.preventKeyNavigation && !this.leftKeyToBreadcrumb && this.toIndex !== null) {
			this.queuedIndex = this.toIndex - 1;
			//queuedIndex could have out boundary value. It will be managed in setIndex()
		}
		var orig = ev.originator,
			idx = this.getPanelIndex(orig);

		if (this.considerSpottingCloseButton('LEFT', orig)) {
			return true;
		} else if (orig instanceof Panel) {
			if (idx === 0) {
				if (!this.preventKeyNavigation && this.showing && (this.useHandle === true)
						&& this.handleShowing) {
					this.hide();
					return true;
				}
			} else if (!this.leftKeyToBreadcrumb) {
				if (!this.preventKeyNavigation) {
					this.previous();
				} else {
					Spotlight.spot(Spotlight.getLastControl());
				}
				return true;
			} else if (sender instanceof ApplicationCloseButton && this.$.breadcrumbs) {
				Spotlight.spot(this.$.breadcrumbs);
				return true;
			}
		}
	},

	/**
	* @private
	*/
	spotlightRight: function (sender, ev) {
		if (!this.preventKeyNavigation && this.toIndex !== null) {
			this.queuedIndex = this.toIndex + 1;
			//queuedIndex could have out boundary value. It will be managed in setIndex()
		}
		var orig = ev.originator,
			idx = this.getPanelIndex(orig),
			next = this.getPanels()[idx + 1];

		if (this.considerSpottingCloseButton('RIGHT', orig)) {
			return true;
		} else if (next && orig instanceof Panel) {
			if (this.useHandle === true && this.handleShowing && idx == this.index) {
				Spotlight.spot(this.$.showHideHandle);
				return true;
			}
			else {
				if (!this.preventKeyNavigation) {
					this.next();
					return true;
				}
			}
		}
	},

	/**
	* @private
	*/
	spotlightFromCloseButton: function (sender, ev) {
		var p = this.getActive(),
			idx = this.getPanelIndex(p),
			direction = ev.type.substring(11).toUpperCase(),		// Derive direction from type
			target = Spotlight.NearestNeighbor.getNearestNeighbor(direction, ev.originator, {root: p});

		if (target) {
			Spotlight.spot(target);
			return true;
		} else if (direction == 'RIGHT') {
			if (this.useHandle === true && this.handleShowing && idx == this.index) {
				Spotlight.spot(this.$.showHideHandle);
				return true;
			}
		} else if (direction == 'LEFT') {
			this.spotlightLeft(sender, {originator: p});
			return true;
		}
	},

	/**
	* @private
	*/
	spotlightFocus: function (oSender, oEvent) {
		var orig = oEvent.originator;
		var idx = this.getPanelIndex(orig);
		if (orig.owner === this.$.appClose) {
			Spotlight.Container.setLastFocusedChild(this.getActive(), orig);
		}
		if (this.index !== idx && idx !== -1) {
			this.setIndex(idx);
		}
	},

	/**
	* Responds to tap on show/hide handle.
	*
	* @private
	*/
	handleTap: function () {
		this.setShowing(!this.showing);
	},

	/**
	* @private
	*/
	handleSpotLeft: function () {
		if (this.showing) {
			Spotlight.spot(this.getActive());
		} else {
			Spotlight.unspot();
		}
		return true;
	},

	/**
	* @private
	*/
	handleSpotRight: function (sender, event) {
		if (this.showing) {
			return true;
		}
	},

	/**
	* @private
	*/
	handleBlur: function (sender, event) {
		if (this.isHandleFocused) {
			this.set('isHandleFocused', false);
			if (!Spotlight.getPointerMode()) {
				if (!this.showing) {
					this.sendPanelsHiddenSignal();
				}
			}
		}
		this.resetHandleAutoHide();
		if (!this.showing) {
			Signals.send('onPanelsHandleBlurred');
		}
	},

	/**
	* @private
	*/
	sendPanelsHiddenSignal: function () {
		Signals.send('onPanelsHidden', {panels: this});
	},

	/**
	* @private
	*/
	resetHandleAutoHide: function (sender, event) {
		this.startJob('autoHide', 'stashHandle', this.getAutoHideTimeout());
	},

	/**
	* @private
	*/
	stopHandleAutoHide: function (sender, event) {
		this.stopJob('autoHide');
	},

	/**
	* @private
	*/
	stashHandle: function () {
		this.$.showHideHandle.addRemoveClass('stashed', !this.showing);
	},

	/**
	* @private
	*/
	unstashHandle: function () {
		this.stopHandleAutoHide();
		this.$.showHideHandle.removeClass('stashed');
	},

	/**
	* @private
	*/
	handleFocused: function () {
		this.unstashHandle();
		this.startJob('autoHide', 'handleSpotLeft', this.getAutoHideTimeout());
		this.set('isHandleFocused', true);
		Signals.send('onPanelsHandleFocused');
	},

	/**
	* @private
	*/
	handleShowingChanged: function () {
		//* show handle only when useHandle is true
		if (this.useHandle !== true) { return; }
		this.$.showHideHandle.addRemoveClass('hidden', !this.handleShowing);
		this.$.showHideHandle.spotlight = this.handleShowing;
	},

	/**
	* Called when focus enters one of the panels. If currently hiding and
	* `this.useHandle` is `true`, shows handle.
	*
	* @private
	*/
	onSpotlightPanelEnter: function () {
		if (!this.showing && (this.useHandle === true) && this.handleShowing ) {
			Spotlight.spot(this.$.showHideHandle);
			return true;
		}
	},

	/**
	* Sets the index of the active panel, possibly transitioning the panel into view.
	*
	* @param {number} index - Index of the panel to make active.
	* @public
	*/
	setIndex: function (index) {
		var panels, toPanel;

		// Normally this.index cannot be smaller than 0 and larger than panels.length
		// However, if panels uses handle and there is sequential key input during transition
		// then index could have -1. It means that panels will be hidden.
		if (this.toIndex === null || this.useHandle === false) {
			index = this.clamp(index);
		}

		if (index === this.index || this.toIndex != null) {
			return;
		}

		// Clear before start
		this.queuedIndex = null;
		this._willMove = null;

		// Set indexes before notify panels
		this.fromIndex = this.index;
		this.toIndex = index;

		// Turn on the close-x so it's ready for the next panel; if hasCloseButton is true
		// and remove spottability of close button during transitions.
		if (this.$.appClose) {
			if (this.hasNode()) this.$.appClose.customizeCloseButton({'spotlight': false});
			this.$.appClose.set('showing', this.hasCloseButton);
		}
		this.notifyPanels('initPanel');
		this.notifyBreadcrumbs('updateBreadcrumb');

		// Ensure any VKB is closed when transitioning panels
		this.blurActiveElementIfHiding(index);

		if (this.cacheViews) {
			panels = this.getPanels();
			toPanel = panels[this.toIndex];

			if (!toPanel.generated) {
				if (this.toIndex < this.fromIndex) toPanel.addBefore = panels[this.fromIndex];
				toPanel.render();
			}
		}

		// If panels will move for this index change, kickoff animation. Otherwise skip it.
		if (this.shouldAnimate()) {
			Spotlight.mute(this);
			this.startTransition();
			this.addClass('transitioning');
		}

		this._setIndex(this.toIndex);
	},

	/**
	* @private
	*/
	blurActiveElementIfHiding: function (index) {
		var activeElement = document.activeElement,
			activeComponent = activeElement ? dispatcher.$[activeElement.id] : null,
			panels = this.getPanels(),
			panel,
			panelInfo;
		if (activeComponent) {
			for (var i = 0; i < panels.length; i++) {
				panel = panels[i];
				if (activeComponent.isDescendantOf(panel)) {
					panelInfo = this.getTransitionInfo(i, index);
					if (panelInfo.isOffscreen) {
						document.activeElement.blur();
					}
					break;
				}
			}
		}
	},

	/**
	* Returns `true` if the panels should animate in the transition from `fromIndex` to
	* `toIndex`.
	*
	* @private
	*/
	shouldAnimate: function () {
		if (this._willMove === null) {
			/*jshint -W093 */
			return (this._willMove = this.animate && this.shouldArrange() && this.getAbsoluteShowing());
			/*jshint +W093 */
		}
		else {
			return this._willMove;
		}
	},

	/**
	* Returns `true` if any panels will move in the transition from `fromIndex` to `toIndex`.
	*
	* @private
	*/
	shouldArrange: function () {
		return this.layout.shouldArrange ? this.layout.shouldArrange(this.fromIndex, this.toIndex) : true;
	},

	/**
	*
	* @private
	*/
	_setIndex: function (index) {
		var prev = this.get('index');
		this.index = this.clamp(index);
		// Accessibility - Before reading the focused item, it must have a alert role for reading the title,
		// so setAlertRole() must be called before notifyObservers('index', prev, index).
		if (MoonOptions.accessibility) {
			this.setAlertRole();
		}
		this.notifyObservers('index', prev, index);
	},

	/**
	* Called when the arranger animation completes.
	*
	* @private
	*/
	animationEnded: function () {
		if (this.animate) {
			this.removeClass('transitioning');
			this.completed();
		} else {
			Panels.prototype.animationEnded.apply(this, arguments);
		}

		return true;
	},

	/**
	* @private
	*/
	getTransitionInfo: function (inPanelIndex) {
		var to = (this.toIndex || this.toIndex === 0) ? this.toIndex : this.index,
			info = {};
		info.isOffscreen = (inPanelIndex != to);
		info.from = this.fromIndex;
		info.to = this.toIndex;
		info.index = inPanelIndex;
		info.animate = this.animate;
		return info;
	},

	/**
	* @private
	*/
	getBreadcrumbPositionInfo: function (bounds, containerBounds) {
		var right = bounds ? bounds.right : null,
			left = bounds ? bounds.left : null,
			panelEdge = containerBounds ? containerBounds.right : null;

		return {isOffscreen: (right == null || left == null || panelEdge == null || right <= 0 || left >= panelEdge)};
	},

	/**
	* Set index to breadcrumb to display number
	*
	* @private
	*/
	assignBreadcrumbIndex: function() {
		var range = this.getBreadcrumbRange(),
			control, i;

		if (this.pattern != 'none') {
			for (i=range.start; i<range.end; i++) {
				control = this.getBreadcrumbForIndex(i);
				control.set('index', i);
			}
		}
	},

	/**
	* @private
	*/
	addBreadcrumb: function (forceRender) {
		if (this.pattern == 'none' || !this.$.breadcrumbs) return;

		// If we have 1 panel then we don't need breadcrumb.
		// If we have more then 1 panel then we need panel - 1 number of breadcrumbs.
		// But, if we can only see 1 breadcrumb on screen like activity pattern
		// then we need 2 breadcrumbs to show animation.
		var len = Math.max(2, Math.min(this.getPanels().length-1, this.getBreadcrumbMax()+1)),
			defs = [],
			prevLen = this.getBreadcrumbs().length,
			breadcrumbs, i;

		for(i=0; i<len-prevLen; i++) {
			defs[i] = {kind: Breadcrumb};
		}
		this.$.breadcrumbs.createComponents(defs, {owner: this});
		if (forceRender) {
			breadcrumbs = this.getBreadcrumbs();
			for (i=prevLen; i<len; i++) {
				breadcrumbs[i].render();
			}
		}
	},

	/**
	* @private
	*/
	removeBreadcrumb: function () {
		if (this.pattern == 'none' || !this.$.breadcrumbs) return;

		// If we have 1 panel then we don't need breadcrumb.
		// If we have more then 1 panel then we need panel - 1 number of breadcrumbs.
		// But, if we can only see 1 breadcrumb on screen like activity pattern
		// then we need 2 breadcrumbs to show animation.
		var len = Math.max(2, Math.min(this.getPanels().length-1, this.getBreadcrumbMax()+1));

		// If we have more than the number of necessary breadcrumb then destroy.
		while (this.getBreadcrumbs().length > len) {
			this.getBreadcrumbs()[this.getBreadcrumbs().length-1].destroy();
		}
	},

	/**
	* Assign direction property on animator to select proper timing function.
	*
	* @private
	*/
	getDirection: function() {
		return  (this.fromIndex == this.toIndex) ? 'none' :
				(this.fromIndex < this.toIndex) ? 'forward' : 'backward';
	},

	/**
	* @private
	*/
	adjustFirstPanelBeforeTransition: function() {
		var idx = this.index,
			from = this.fromIndex,
			trans = this.transitioning;
		if (this.pattern == 'activity') {
			// Show breadcrumbs if we're landing on any panel besides the first
			this.$.breadcrumbs.set('showing', idx > 0);
			// Adjust viewport to show full-width panel if we're landing on OR transitioning from the first panel
			this.addRemoveClass('first', idx === 0 || (trans && from === 0));
		}
	},

	/**
	* @private
	*/
	adjustFirstPanelAfterTransition: function() {
		// Keep viewport adjusted for full-width panel only if we've landed on the first panel
		if (this.pattern == 'activity' && this.index !== 0) {
			this.removeClass('first');
		}
	},

	/**
	* When index changes, make sure to update the breadcrumbed panel's `spotlight` property
	* (to avoid {@glossary Spotlight} issues).
	*
	* @private
	*/
	indexChanged: function (was) {
		var current, delta, deltaAbs, idx;

		this.adjustFirstPanelBeforeTransition();

		if (this.getPanels().length > 0) {
			this.assignBreadcrumbIndex();

			// Set animation direction to use proper timing function before start animation
			// This direction is only consumed by MoonAnimator.
			this.$.animator.direction = this.getDirection();

			// Push or drop history, based on the direction of the index change
			if (this.allowBackKey) {
				was = was || 0;
				delta = this.index - was;
				deltaAbs = Math.abs(delta);

				if (delta > 0) {
					for (idx = 0; idx < deltaAbs; idx++) {
						this.pushBackHistory(idx + was);
					}
				} else {
					current = EnyoHistory.peek();

					// ensure we have history to drop - if the first history entry's index corresponds
					// to the index prior to our current index, we assume the other entries exist
					if (current && current.index + 1 == was) {
						EnyoHistory.drop(deltaAbs);
					}
				}
			}
		}

		Panels.prototype.indexChanged.apply(this, arguments);
	},

	/**
	* @private
	*/
	notifyPanels: function (method) {
		var panels = this.getPanels(),
			panel, info, i;
		for (i = 0; (panel = panels[i]); i++) {
			info = this.getTransitionInfo(i);
			if (panel[method]) {
				panel[method](info);
			}
		}
	},

	/**
	* @private
	*/
	notifyBreadcrumbs: function (method) {
		if (this.pattern == 'none' || !this.$.breadcrumbs) return;

		var range = this.getBreadcrumbRange(),
			containerBounds = this.$.breadcrumbs.getAbsoluteBounds(),
			control, bounds, info, i;
		for (i=range.start; i<range.end; i++) {
			control = this.getBreadcrumbForIndex(i);
			bounds = control.getAbsoluteBounds();
			info = this.getBreadcrumbPositionInfo(bounds, containerBounds);
			if (control[method]) {
				control[method](info);
			}
		}
	},

	/**
	* @private
	*/
	processPanelsToRemove: function(fromIndex, toIndex) {
		var direction = toIndex < fromIndex ? -1 : 1,
			removeFrom;

		// Remove panels that are no longer on screen
		if (this.cacheViews || (direction < 0 && this.popOnBack)) {
			removeFrom = toIndex - direction;
			this.popPanels(removeFrom, direction);
		}
	},

	processQueuedKey: function() {
		// queuedIndex becomes -1 when left key input is occurred
		// during transition from index 1 to 0.
		// We can hide panels if we use handle.
		if (this.queuedIndex === -1 && this.useHandle) {
			this.hide();
		} else if (this.queuedIndex !== null) {
			this.setIndex(this.queuedIndex);
		}
	},

	/**
	* @private
	*/
	finishTransition: function () {
		var fromIndex = this.fromIndex,
			toIndex = this.toIndex,
			active, current;

		this.adjustFirstPanelAfterTransition();
		this.notifyPanels('transitionFinished');
		this.notifyBreadcrumbs('updateBreadcrumb');
		Panels.prototype.finishTransition.apply(this, arguments);
		this.processPanelsToRemove(fromIndex, toIndex);
		this.processQueuedKey();

		Spotlight.unmute(this);
		active = this.getActive();
		current = Spotlight.getCurrent();
		if (!current || !current.isDescendantOf(active)) Spotlight.spot(active);
		this.$.appClose && this.$.appClose.customizeCloseButton({'spotlight': true});  // Restore spotlightability of close button.
	},

	/**
	* Override the default `getShowing()` behavior to avoid setting `this.showing` based on the
	* CSS `display` property.
	*
	* @private
	*/
	getShowing: function () {
		return this.showing;
	},

	/**
	* @private
	*/
	showingChanged: function (inOldValue) {
		// Accessibility - Before reading the focused item, it must have a alert role for reading the title,
		// so setAlertRole() must be called before Spotlight.spot
		if (MoonOptions.accessibility) {
			this.setAlertRole();
		}
		if (this.$.backgroundScrim) {
			this.$.backgroundScrim.addRemoveClass('visible', this.showing);
		}
		if (this.useHandle === true) {
			if (this.showing) {
				this.unstashHandle();
				this._show();
				Spotlight.spot(this.getActive());
			}
			else {
				// in this case, our display flag will have been set to none so we need to clear
				// that even though the showing flag will remain false
				this.applyStyle('display', null);
				this.resetHandleAutoHide();
				this._hide();
			}
			this.sendShowingChangedEvent(inOldValue);

			if (this.$.appClose) this.$.appClose.set('showing', (this.showing && this.hasCloseButton));
		}
		else {
			Panels.prototype.showingChanged.apply(this, arguments);
		}
	},

	/**
	* @private
	*/
	applyPattern: function () {
		if (this.pattern != 'alwaysviewing') {
			this.createChrome(this.applicationTools);
			this.hasCloseButtonChanged();
		}
		switch (this.pattern) {
		case 'alwaysviewing':
		case 'activity':
			this.addClass(this.pattern);
			this.useHandle = (this.useHandle === 'auto') ? (this.pattern == 'activity' ? false : true) : this.useHandle;
			this.createChrome(this.handleTools);
			this.tools = this.animatorTools;
			break;
		default:
			this.useHandle = false;
			this.createChrome([{name: 'client', kind: Control, tag: null}]);
			break;
		}
	},

	/**
	* @private
	*/
	initializeShowHideHandle: function () {
		if (this.useHandle === true) {
			this.$.showHideHandle.canGenerate = true;
			this.$.showHideHandle.spotlight = true;
		}
	},

	/**
	* Shows panels with transition from right.
	*
	* @private
	*/
	_show: function () {
		var init = false;
		if (!this.hasNode()) {
			init = true;
		} else {
			this.$.showHideHandle.addClass('right');
			this.applyShowAnimation();
		}
		Signals.send('onPanelsShown', {initialization: init, panels: this});
	},

	/**
	* Hides panels with transition to right.
	*
	* @private
	*/
	_hide: function () {
		if (!this.hasNode()) {
			return;
		}
		this.$.showHideHandle.removeClass('right');
		this.applyHideAnimation();
		this.sendPanelsHiddenSignal();
	},

	/**
	* Sets show state without animation.
	*
	* @private
	*/
	_directShow: function () {
		this.$.showHideHandle.addClass('right');
		if (this.handleShowing) {
			this.$.showHideHandle.removeClass('hidden');
		}
		this.applyShowAnimation(true);
	},

	/**
	* Sets hide state without animation.
	*
	* @private
	*/
	_directHide: function () {
		this.$.showHideHandle.addClass('hidden');
		this.$.showHideHandle.removeClass('right');
		this.applyHideAnimation(true);
		this.hideAnimationComplete();
	},

	/**
	* @private
	*/
	applyShowAnimation: function (direct) {
		this.$.clientWrapper.applyStyle('transition', direct ? null : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		this.$.clientWrapper.applyStyle('-webkit-transition', direct ? null : '-webkit-transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		dom.transform(this.$.clientWrapper, {translateX: 0});
	},

	/**
	* @private
	*/
	applyHideAnimation: function (direct) {
		this.$.clientWrapper.applyStyle('transition', direct ? null : 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		this.$.clientWrapper.applyStyle('-webkit-transition', direct ? null : '-webkit-transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)');
		dom.transform(this.$.clientWrapper, {translateX: '100%'});
	},

	/**
	* Hide/show animation complete.
	*
	* @private
	*/
	showHideAnimationComplete: function (sender, event) {
		switch (event.animation.name) {
		case 'show':
			this.showAnimationComplete();
			return true;
		case 'hide':
			this.hideAnimationComplete();
			return true;
		}
	},

	/**
	* @private
	*/
	showAnimationComplete: function () {
		if (this.handleShowing) {
			this.$.showHideHandle.removeClass('hidden');
		}
	},

	/**
	* @private
	*/
	hideAnimationComplete: function () {
		if (this.handleShowing) {
			this.$.showHideHandle.removeClass('hidden');
		}
	},

	/**
	* @private
	*/
	animateChanged: function () {
		this.addRemoveClass('moon-composite', this.animate);
	},

	/**
	* @private
	*/
	backKeyHandler: function (entry) {
		var index = entry.index;

		if (this.transitioning) this.queuedIndex = index;
		else this.setIndex(index);

		return true;
	},

	/**
	* @private
	*/
	hasCloseButtonChanged: function () {
		if (!this.$.appClose) return;
		this.$.appClose.set('showing', (this.showing && this.hasCloseButton));
		this.addRemoveClass('has-close-button', this.hasCloseButton);
	},

	/**
	* @private
	*/
	pushBackHistory: function (index) {
		EnyoHistory.push({
			context: this,
			handler: this.backKeyHandler,
			index: index
		});

		return true;
	},

	// Accessibility

	/**
	* @private
	*/
	ariaObservers: [
		// If panels is hidden and panelsHandle is spotlight blured, also make panelsHandle's dom blur.
		{path: 'isHandleFocused', method: function () {
			if (this.$.showHideHandle && this.$.showHideHandle.hasNode() && !this.isHandleFocused) {
				this.$.showHideHandle.hasNode().blur();
			}
		}}
	],

	/**
	* @private
	*/
	setAlertRole: function () {
		var panels = this.getPanels(),
			active = this.getActive(),
			l = panels.length,
			panel;

		if (this.$.showHideHandle) {
			if (active && active.title) {
				this.$.showHideHandle.set('accessibilityLabel', (this.showing ? $L('Close') : $L('Open')) + ' ' + active.title);
			} else {
				this.$.showHideHandle.set('accessibilityLabel', this.showing ? $L('Close') : $L('Open'));
			}
		}

		while (--l >= 0) {
			panel = panels[l];
			if (panel instanceof Panel && panel.title) {
				panel.set('accessibilityRole', (panel === active) && this.get('showing') ? 'alert' : 'region');
			}
		}
	}

});

},{'../i18n':'moonstone/i18n','../ApplicationCloseButton':'moonstone/ApplicationCloseButton','../HistorySupport':'moonstone/HistorySupport','../MoonAnimator':'moonstone/MoonAnimator','../MoonArranger':'moonstone/MoonArranger','../options':'moonstone/options','../Panel':'moonstone/Panel','../StyleAnimator':'moonstone/StyleAnimator'}]
	};

});
//# sourceMappingURL=moonstone.js.map
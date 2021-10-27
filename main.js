const $ = {
	bodyClassAdd: (c) => $.el('body').classList.add(c),
	bodyClassRemove: (c) => $.el('body').classList.remove(c),
	el: (s) => document.querySelector(s),
	els: (s) => [].slice.call(document.querySelectorAll(s) || []),
	escapeRegex: (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
	flattenAndUnique: (arr) => [...new Set([].concat.apply([], arr))],
	isDown: (e) => ['ctrl-n', 'down', 'tab'].includes($.whichKey(e)),
	isRemove: (e) => ['backspace', 'delete'].includes($.whichKey(e)),
	isUp: (e) => ['ctrl-p', 'up', 's-tab'].includes($.whichKey(e)),
	pad: (v) => ('0' + v.toString()).slice(-2),
	whichKey: (e) => {
		const ctrl = e.ctrlKey;
		const meta = e.metaKey;
		const shift = e.shiftKey;

		switch (e.which) {
			case 8:
				return 'backspace';
			case 9:
				return shift ? 's-tab' : 'tab';
			case 13:
				return 'enter';
			case 16:
				return 'shift';
			case 17:
				return 'ctrl';
			case 18:
				return 'alt';
			case 27:
				return 'escape';
			case 38:
				return 'up';
			case 40:
				return 'down';
			case 46:
				return 'delete';
			case 78:
				return ctrl ? 'ctrl-n' : 'n';
			case 80:
				return ctrl ? 'ctrl-p' : 'p';
			case 86:
				if (ctrl) return 'ctrl-v';
				if (meta) return 'ctrl-v';
				break;
			case 91:
			case 93:
			case 224:
				return 'meta';
		}

		if (ctrl) return 'ctrl-*';
		if (meta) return 'meta-*';
	},
};

class Clock {
	constructor(options) {
		this._clockTime = $.el('#clock-time');
		this._clockDate = $.el('#clock-date');
		this._amPm = options.amPm;
		this._delimiter = options.delimiter;
		this._showSeconds = options.showSeconds;
		this._twentyFourHour = options.twentyFourHour;
		this._setTime = this._setTime.bind(this);
		this._clockTime.addEventListener('click', options.onClick);
		this._clockDate.addEventListener('click', options.onClick);
		this._start();
	}

	_setTime() {
		const date = new Date();
		const day = $.pad(date.getDate());
		const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(date);
		const month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date);
		const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(date)
		let hours = $.pad(date.getHours());
		let amPm = '';

		if (!this._twentyFourHour) {
			hours = date.getHours();
			if (hours > 12) hours -= 12;
			else if (hours === 0) hours = 12;
			if (this._amPm) amPm = date.getHours() >= 12 ? ' PM' : ' AM';
		}

		const minutes = this._delimiter + $.pad(date.getMinutes());
		const seconds = this._showSeconds
			? this._delimiter + $.pad(date.getSeconds())
			: '';

		//original clock
		//(new Intl.DateTimeFormat('en-GB', { timeStyle: 'medium' }).format(date)) this._el.innerHTML = hours + minutes + seconds + amPm;

		//new clock
		this._clockDate.innerHTML = (day + ' ' + month + ' ' + year);
		this._clockDate.setAttribute('datetime', date.toTimeString());

		this._clockTime.innerHTML = (hours + minutes + seconds + amPm);
		this._clockTime.setAttribute('datetime', date.toTimeString());
	}

	_start() {
		this._setTime();
		setInterval(this._setTime, 1000);
	}
}

class Help {
	constructor(options) {
		this._el = $.el('#help');
		this._commands = options.commands;
		this._newTab = options.newTab;
		this._toggled = false;
		this.toggle = this.toggle.bind(this);
		this._handleKeydown = this._handleKeydown.bind(this);
		this._buildAndAppendLists();
		this._registerEvents();
	}

	toggle(show) {
		this._toggled = typeof show !== 'undefined' ? show : !this._toggled;
		this._toggled ? $.bodyClassAdd('help') : $.bodyClassRemove('help');
	}

	_buildAndAppendLists() {
		const lists = document.createElement('ul');
		lists.classList.add('categories');

		this._getCategories().forEach((category) => {
			lists.insertAdjacentHTML(
				'beforeend',
				`<li class="category">
					<h2 class="category-name">${category}</h2>
					<ul>${this._buildListCommands(category)}</ul>
				</li>`
			);
		});

		this._el.appendChild(lists);
	}

	_buildListCommands(currentCategory) {
		return this._commands.reduce(
			(acc, { category, color, name, key, url }, i) => {
				if (category !== currentCategory) return acc;
				const target = this._newTab ? '_blank' : '_self';

				return `
					${acc}
					<style>
						.command-key-${i},
						.command-name-${i}::after {
							background: ${color};
						}
					</style>
					<li class="command">
						<a href="${url}" target="${target}" rel="noopener noreferrer">
							<span class="command-key command-key-${i}">${key}</span>
							<span class="command-name command-name-${i}">${name}</span>
						</a>
					</li>
				`;
			},
			''
		);
	}

	_getCategories() {
		const categories = this._commands
			.map((v) => v.category)
			.filter((category) => category);

		return [...new Set(categories)];
	}

	_handleKeydown(e) {
		if ($.whichKey(e) === 'escape') this.toggle(false);
	}

	_registerEvents() {
		document.addEventListener('keydown', this._handleKeydown);
	}
}

class Influencer {
	constructor(options) {
		this._limit = options.limit;
		this._minChars = options.minChars;
		this._parseQuery = options.parseQuery;
	}

	addItem() {
		return undefined;
	}

	getSuggestions() {
		return Promise.resolve([]);
	}

	_addSearchPrefix(items, query) {
		const { isSearch, key, split } = this._parseQuery(query);
		const searchPrefix = isSearch ? `${key}${split} ` : false;
		return items.map((s) => (searchPrefix ? searchPrefix + s : s));
	}

	_isTooShort(query) {
		return query.length < this._minChars;
	}
}

class DefaultInfluencer extends Influencer {
	constructor({ suggestionDefaults }) {
		super(...arguments);
		this._suggestionDefaults = suggestionDefaults;
	}

	getSuggestions(rawQuery) {
		if (this._isTooShort(rawQuery)) return Promise.resolve([]);

		return new Promise((resolve) =>
			resolve(
				(this._suggestionDefaults[rawQuery] || []).slice(0, this._limit)
			)
		);
	}
}

class DuckDuckGoInfluencer extends Influencer {
	constructor({ queryParser }) {
		super(...arguments);
	}

	getSuggestions(rawQuery) {
		const { query } = this._parseQuery(rawQuery);
		if (this._isTooShort(rawQuery) || !query) return Promise.resolve([]);

		return new Promise((resolve) => {
			const callback = 'autocompleteCallback';

			window[callback] = (res) => {
				const suggestions = res
					.map((i) => i.phrase)
					.filter((s) => s.toLowerCase() !== query.toLowerCase())
					.slice(0, this._limit);

				resolve(this._addSearchPrefix(suggestions, rawQuery));
			};

			const script = document.createElement('script');
			script.src = `https://duckduckgo.com/ac/?callback=${callback}&q=${query}`;
			$.el('head').appendChild(script);
		});
	}
}

class HistoryInfluencer extends Influencer {
	constructor() {
		super(...arguments);
		this._storeName = 'history';
	}

	static clearHistory() {
		localStorage.clear();
	}

	addItem(query) {
		if (query.length < 2) return;
		let exists;

		const history = this._getHistory().map(([item, count]) => {
			const match = item.toLowerCase() === query.toLowerCase();
			if (match) exists = true;
			return [item, match ? count + 1 : count];
		});

		if (!exists) history.push([query, 1]);

		const sorted = history
			.sort((current, next) => current[1] - next[1])
			.reverse();

		this._setHistory(sorted);
	}

	getSuggestions(rawQuery) {
		if (this._isTooShort(rawQuery)) return Promise.resolve([]);

		return new Promise((resolve) =>
			resolve(
				this._getHistory()
					.map(([item]) => item)
					.filter(
						(item) =>
							rawQuery &&
							item.toLowerCase() !== rawQuery.toLowerCase() &&
							item.toLowerCase().indexOf(rawQuery.toLowerCase()) !== -1
					)
					.slice(0, this._limit)
			)
		);
	}

	_fetch() {
		return JSON.parse(localStorage.getItem(this._storeName)) || [];
	}

	_getHistory() {
		this._history = this._history || this._fetch();
		return this._history;
	}

	_save(history) {
		localStorage.setItem(this._storeName, JSON.stringify(history));
	}

	_setHistory(history) {
		this._history = history;
		this._save(history);
	}
}

class Suggester {
	constructor(options) {
		this._el = $.el('#search-suggestions');
		this._influencers = options.influencers;
		this._limit = options.limit;
		this._currentInput = '';
		this._highlitedSuggestion = null;
		this._suggestionEls = [];
		this._handleKeydown = this._handleKeydown.bind(this);
		this._setSuggestions = this._setSuggestions.bind(this);
		this._registerEvents();
	}

	setOnClick(callback) {
		this._onClick = callback;
	}

	setOnHighlight(callback) {
		this._onHighlight = callback;
	}

	setOnUnhighlight(callback) {
		this._onUnhighlight = callback;
	}

	success(query) {
		this._influencers.forEach((i) => i.addItem(query));
		this._clearSuggestions();
	}

	suggest(input) {
		this._currentInput = input.trim();
		this._highlitedSuggestion = null;

		if (!this._currentInput) {
			this._clearSuggestions();
			return;
		}

		Promise.all(this._getInfluencers()).then(this._setSuggestions);
	}

	_buildSuggestionsHtml(suggestions) {
		return suggestions.slice(0, this._limit).reduce((acc, suggestion) => {
			const match = new RegExp($.escapeRegex(this._currentInput), 'i');
			const matched = suggestion.match(match);

			const suggestionHtml = matched
				? suggestion.replace(
					match,
					`<span class="search-suggestion-match">${matched[0]}</span>`
				)
				: suggestion;

			return `
					${acc}
					<li>
						<button
							type="button"
							class="js-search-suggestion search-suggestion"
							data-suggestion="${suggestion}"
							tabindex="-1"
						>
							${suggestionHtml}
						</button>
					</li>
				`;
		}, '');
	}

	_clearSuggestionClickEvents() {
		this._suggestionEls.forEach((el) => {
			el.removeEventListener('click', this._onClick);
		});
	}

	_clearSuggestionHighlightEvents() {
		this._suggestionEls.forEach((el) => {
			el.removeEventListener('mouseover', this._highlight);
			el.removeEventListener('mouseout', this._unHighlight);
		});
	}

	_clearSuggestions() {
		$.bodyClassRemove('suggestions');
		this._clearSuggestionHighlightEvents();
		this._clearSuggestionClickEvents();
		this._el.innerHTML = '';
		this._highlitedSuggestion = null;
		this._suggestionEls = [];
	}

	_focusNext(e) {
		const exists = this._suggestionEls.some((el, i) => {
			if (el.classList.contains('highlight')) {
				this._highlight(this._suggestionEls[i + 1], e);
				return true;
			}
		});

		if (!exists) this._highlight(this._suggestionEls[0], e);
	}

	_focusPrevious(e) {
		const exists = this._suggestionEls.some((el, i) => {
			if (el.classList.contains('highlight') && i) {
				this._highlight(this._suggestionEls[i - 1], e);
				return true;
			}
		});

		if (!exists) this._unHighlight(e);
	}

	_getInfluencers() {
		return this._influencers.map((influencer) =>
			influencer.getSuggestions(this._currentInput)
		);
	}

	_handleKeydown(e) {
		if ($.isDown(e)) this._focusNext(e);
		if ($.isUp(e)) this._focusPrevious(e);
	}

	_highlight(el, e) {
		this._unHighlight();
		if (!el) return;
		this._highlitedSuggestion = el.getAttribute('data-suggestion');
		this._onHighlight(this._highlitedSuggestion);
		el.classList.add('highlight');
		if (e) e.preventDefault();
	}

	_registerEvents() {
		document.addEventListener('keydown', this._handleKeydown);
	}

	_registerSuggestionClickEvents() {
		this._suggestionEls.forEach((el) => {
			const value = el.getAttribute('data-suggestion');
			el.addEventListener('click', this._onClick.bind(null, value));
		});
	}

	_registerSuggestionHighlightEvents() {
		const noHighlightUntilMouseMove = () => {
			window.removeEventListener('mousemove', noHighlightUntilMouseMove);

			this._suggestionEls.forEach((el) => {
				el.addEventListener('mouseover', this._highlight.bind(this, el));
				el.addEventListener('mouseout', this._unHighlight.bind(this));
			});
		};

		window.addEventListener('mousemove', noHighlightUntilMouseMove);
	}

	_rehighlight() {
		if (!this._highlitedSuggestion) return;
		this._highlight($.el(`[data-suggestion="${this._highlitedSuggestion}"]`));
	}

	_setSuggestions(newSuggestions) {
		const suggestions = $.flattenAndUnique(newSuggestions);
		this._el.innerHTML = this._buildSuggestionsHtml(suggestions);
		this._suggestionEls = $.els('.js-search-suggestion');
		this._registerSuggestionHighlightEvents();
		this._registerSuggestionClickEvents();
		if (this._suggestionEls.length) $.bodyClassAdd('suggestions');
		this._rehighlight();
	}

	_unHighlight(e) {
		const el = $.el('.highlight');
		if (!el) return;
		this._onUnhighlight();
		el.classList.remove('highlight');
		if (e) e.preventDefault();
	}
}

class QueryParser {
	constructor(options) {
		this._commands = options.commands;
		this._searchDelimiter = options.searchDelimiter;
		this._pathDelimiter = options.pathDelimiter;
		this._scripts = options.scripts;
		this._protocolRegex = /^[a-zA-Z]+:\/\//i;
		this._urlRegex = /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/i;
		this.parse = this.parse.bind(this);
	}

	parse(query) {
		const res = [];
		res.query = query;
		res.split = null;

		if (this._urlRegex.test(query)) {
			const hasProtocol = this._protocolRegex.test(query);
			res.redirect = hasProtocol ? query : 'http://' + query;
			res.color = QueryParser._getColorFromUrl(this._commands, res.redirect);
			return res;
		}

		const trimmed = query.trim();
		const splitSearch = trimmed.split(this._searchDelimiter);
		const splitPath = trimmed.split(this._pathDelimiter);

		const isScript = Object.entries(this._scripts).some(([key, script]) => {
			if (query === key) {
				res.key = key;
				res.isKey = true;
				script.forEach((command) => res.push(this.parse(command)));
				return true;
			}

			if (splitSearch[0] === key) {
				res.key = key;
				res.isSearch = true;
				res.split = this._searchDelimiter;
				res.query = QueryParser._shiftAndTrim(splitSearch, res.split);

				script.forEach((command) =>
					res.push(this.parse(`${command}${res.split}${res.query}`))
				);

				return true;
			}

			if (splitPath[0] === key) {
				res.key = key;
				res.split = this._pathDelimiter;
				res.path = QueryParser._shiftAndTrim(splitPath, res.split);

				script.forEach((command) =>
					res.push(this.parse(`${command}${this._pathDelimiter}${res.path}`))
				);

				return true;
			}
		});

		if (isScript) return res;

		this._commands.some(({ key, search, url }) => {
			if (query === key) {
				res.key = key;
				res.isKey = true;
				res.redirect = url;
				return true;
			}

			if (splitSearch[0] === key) {
				res.key = key;
				res.isSearch = true;
				res.split = this._searchDelimiter;
				res.query = QueryParser._shiftAndTrim(splitSearch, res.split);
				res.redirect = QueryParser._prepSearch(url, search, res.query);
				return true;
			}

			if (splitPath[0] === key) {
				res.key = key;
				res.split = this._pathDelimiter;
				res.path = QueryParser._shiftAndTrim(splitPath, res.split);
				res.redirect = QueryParser._prepPath(url, res.path);
				return true;
			}

			if (key === '*') {
				res.redirect = QueryParser._prepSearch(url, search, query);
			}
		});

		res.color = QueryParser._getColorFromUrl(this._commands, res.redirect);
		return res;
	}

	static _getColorFromUrl(commands, url) {
		const domain = new URL(url).hostname;
		const domainRegex = new RegExp(`${domain}$`);

		return (
			commands
				.filter((c) => domainRegex.test(new URL(c.url).hostname))
				.map((c) => c.color)[0] || null
		);
	}

	static _prepPath(url, path) {
		return QueryParser._stripUrlPath(url) + '/' + path;
	}

	static _prepSearch(url, searchPath, query) {
		if (!searchPath) return url;
		const baseUrl = QueryParser._stripUrlPath(url);
		const urlQuery = encodeURIComponent(query);
		searchPath = searchPath.replace(/{}/g, urlQuery);
		return baseUrl + searchPath;
	}

	static _shiftAndTrim(arr, delimiter) {
		arr.shift();
		return arr.join(delimiter).trim();
	}

	static _stripUrlPath(url) {
		const parser = document.createElement('a');
		parser.href = url;
		return `${parser.protocol}//${parser.hostname}`;
	}
}

class Form {
	constructor(options) {
		this._formEl = $.el('#search-form');
		this._inputEl = $.el('#search-input');
		this._inputElVal = '';
		this._instantRedirect = options.instantRedirect;
		this._newTab = options.newTab;
		this._parseQuery = options.parseQuery;
		this._suggester = options.suggester;
		this._toggleHelp = options.toggleHelp;
		this._clearPreview = this._clearPreview.bind(this);
		this._handleInput = this._handleInput.bind(this);
		this._handleKeydown = this._handleKeydown.bind(this);
		this._previewValue = this._previewValue.bind(this);
		this._submitForm = this._submitForm.bind(this);
		this._submitWithValue = this._submitWithValue.bind(this);
		this.hide = this.hide.bind(this);
		this.show = this.show.bind(this);
		this._registerEvents();
		this._loadQueryParam();
	}

	hide() {
		$.bodyClassRemove('form');
		this._inputEl.value = '';
		this._inputElVal = '';
		this._suggester.suggest('');
		this._setColorsFromQuery('');
	}

	show() {
		$.bodyClassAdd('form');
		this._inputEl.focus();
	}

	_clearPreview() {
		this._previewValue(this._inputElVal);
		this._inputEl.focus();
	}

	_handleInput() {
		const newQuery = this._inputEl.value;
		const isHelp = newQuery === '?';
		const { isKey } = this._parseQuery(newQuery);
		this._inputElVal = newQuery;
		this._suggester.suggest(newQuery);
		this._setColorsFromQuery(newQuery);
		if (!newQuery || isHelp) this.hide();
		if (isHelp) this._toggleHelp();
		if (this._instantRedirect && isKey) this._submitWithValue(newQuery);
	}

	_handleKeydown(e) {
		if ($.isUp(e) || $.isDown(e) || $.isRemove(e)) return;

		switch ($.whichKey(e)) {
			case 'alt':
			case 'ctrl':
			case 'ctrl-*':
			case 'enter':
			case 'meta':
			case 'meta-*':
			case 'shift':
				return;
			case 'escape':
				this.hide();
				return;
		}

		this.show();
		help.toggle(false);
	}

	_loadQueryParam() {
		const q = new URLSearchParams(window.location.search).get('q');
		if (q) this._submitWithValue(q);
	}

	_previewValue(value) {
		this._inputEl.value = value;
		this._setColorsFromQuery(value);
	}

	_redirect(redirect, forceNewTab) {
		if (this._newTab || forceNewTab) {
			window.open(redirect, '_blank', 'noopener noreferrer');
		} else {
			window.location.href = redirect;
		}
	}

	_registerEvents() {
		document.addEventListener('keydown', this._handleKeydown);
		this._inputEl.addEventListener('input', this._handleInput);
		this._formEl.addEventListener('submit', this._submitForm, false);

		if (this._suggester) {
			this._suggester.setOnClick(this._submitWithValue);
			this._suggester.setOnHighlight(this._previewValue);
			this._suggester.setOnUnhighlight(this._clearPreview);
		}
	}

	_setColorsFromQuery(query) {
		const color = this._parseQuery(query).color;
		//this changes the background color when a key is recognized.
		//this._formEl.style.background = color || '';
	}

	_submitForm(e) {
		if (e) e.preventDefault();
		const query = this._inputEl.value;
		if (this._suggester) this._suggester.success(query);
		this.hide();
		const res = this._parseQuery(query);

		if (res.length) {
			res.forEach((r) => this._redirect(r.redirect, true));
			return;
		}

		this._redirect(res.redirect);
	}

	_submitWithValue(value) {
		this._inputEl.value = value;
		this._submitForm();
	}
}

class CommandParser {
	static commandHuesToColor(command) {
		const hsla = (hue, saturation = 'var(--command-color-saturation)') =>
			`hsla(${hue}, ${saturation}, var(--command-color-lightness), var(--command-color-alpha))`;

		if (command.color) return command;
		command.color = command.category ? hsla(0, '0%') : null;
		if (!command.hues) return command;

		if (command.hues.length === 1) {
			command.color = hsla(command.hues[0]);
			return command;
		}

		const c = command.hues.reduce((a, h) => `${a}, ${hsla(h)}`, '');
		command.color = `linear-gradient(var(--command-color-gradient) ${c})`;
		return command;
	}
}

const commands = CONFIG.commands.map(CommandParser.commandHuesToColor);

const queryParser = new QueryParser({
	commands,
	pathDelimiter: CONFIG.queryPathDelimiter,
	scripts: CONFIG.scripts,
	searchDelimiter: CONFIG.querySearchDelimiter,
});

const influencers = CONFIG.suggestionInfluencers.map((influencerConfig) => {
	return new {
		Default: DefaultInfluencer,
		DuckDuckGo: DuckDuckGoInfluencer,
		History: HistoryInfluencer,
	}[influencerConfig.name]({
		limit: influencerConfig.limit,
		minChars: influencerConfig.minChars,
		parseQuery: queryParser.parse,
		suggestionDefaults: CONFIG.suggestionDefaults,
	});
});

const suggester = new Suggester({
	influencers,
	limit: CONFIG.suggestionLimit,
});

const help = new Help({
	commands,
	newTab: CONFIG.queryNewTab,
});

const form = new Form({
	instantRedirect: CONFIG.queryInstantRedirect,
	newTab: CONFIG.queryNewTab,
	parseQuery: queryParser.parse,
	suggester,
	toggleHelp: help.toggle,
});

new Clock({
	amPm: CONFIG.clockShowAmPm,
	delimiter: CONFIG.clockDelimiter,
	onClick: CONFIG.clockOnClickAction === 'Search' ? form.show : help.toggle,
	showSeconds: CONFIG.clockShowSeconds,
	twentyFourHour: CONFIG.clockTwentyFourHour,
});
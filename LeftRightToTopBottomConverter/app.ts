/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="Scripts/Mntone/LeftRightToTopBottomConverter.ts" />

class IndexPageViewModel
{
	private converter: LeftRightToTopBottomConverter;

	private source: KnockoutObservable<string> = ko.observable( "“日本語ﾃｽﾄ”🐱ABO(略)…" );
	private result: KnockoutComputed<string>;

	constructor()
	{
		this.converter = new LeftRightToTopBottomConverter();
		this.converter.setTemplateNewLine( "<br>" );
		this.result = ko.computed( () => this.converter.convert( this.source() ) ).extend( {
			timeout: 300
		});
	}

	openTweetPage(): void
	{
		window.open( "https://twitter.com/intent/tweet?text=" + encodeURI( this.result().replace( /\<br\>/g, "\n" ) ) + "&source=webclient" );
	}
}

window.onload = () =>
{
	var vm = new IndexPageViewModel();
	ko.applyBindings( vm );
};
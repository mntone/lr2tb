/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="Scripts/Mntone/LeftRightToTopBottomConverter.ts" />

class IndexPageViewModel
{
	private converter: LeftRightToTopBottomConverter;

	source: KnockoutObservable<string> = ko.observable( "“日本語ﾃｽﾄ”🐱ABO(略)…" );
	result: KnockoutComputed<string>;

	maximumCharactersOfALine: KnockoutObservable<number>;
	isLineSpaceEnabled: KnockoutObservable<boolean>;

	constructor()
	{
		this.converter = new LeftRightToTopBottomConverter();
		this.converter.setTemplateNewLine( "<br>" );

		this.maximumCharactersOfALine = this.converter.maximumCharactersOfALine;
		this.isLineSpaceEnabled = this.converter.isLineSpaceEnabled;

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
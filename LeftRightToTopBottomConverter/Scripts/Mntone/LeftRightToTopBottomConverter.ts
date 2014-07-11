/// <reference path="TextSupport.ts" />

class LeftRightToTopBottomConverter
{
	templateTopLeftCorner: KnockoutObservable<string> = ko.observable( "┏" );
	templateTopRightCorner: KnockoutObservable<string> = ko.observable( "┓" );
	templateBottomRightCorner: KnockoutObservable<string> = ko.observable( "┛" );
	templateBottomLeftCorner: KnockoutObservable<string> = ko.observable( "┗" );

	templateLeftCenter: KnockoutObservable<string> = ko.observable( "┃" );
	templateTopCenter: KnockoutObservable<string> = ko.observable( "┷" );
	templateRightCenter: KnockoutObservable<string> = ko.observable( "┃" );
	templateBottomCenter: KnockoutObservable<string> = ko.observable( "━" );

	templateLeft: KnockoutObservable<string> = ko.observable( "┃" );
	templateTop: KnockoutObservable<string> = ko.observable( "━" );
	templateRight: KnockoutObservable<string> = ko.observable( "┃" );
	templateBottom: KnockoutObservable<string> = ko.observable( "━" );

	private templateNewLine: string = "\n";

	private templateFullSpace = "　";
	private templateHalfSpace = " ";
	private templateQuarterSpace = " ";

	maximumCharactersOfALine: KnockoutObservable<number> = ko.observable( 12 );
	isLineSpaceEnabled: KnockoutObservable<boolean> = ko.observable( false );

	convertTable: string[][];

	constructor()
	{
		this.convertTable = this.createConvertTable(
			"a-zA-Z0-9 ーｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾜｦﾝｧｨｩｪｫｬｭｮｯｰ･ﾞﾟ､、｡。,，.．:：;；!！?？“”<>＜＞∧∨⋀⋁()（）「」｢｣『』[]［］{}｛｝〔〕〈〉《》【】‥…⋮⋯⋰⋱￩￪￫￬←↑→↓↖↗↘↙↔↕⇅⇄⇵⇆⇇⇈⇉⇊⇦⇧⇨⇩☜☝☞☟👈👆👉👇↼↾⇁⇃↽↿⇀⇂⇠⇡⇢⇣⇐⇑⇒⇓⇖⇗⇘⇙⇔⇕↤↥↦↧↞↟↠↡⬅⬆➡⬇─│┌┐┘└├┬┤┴━┃┏┓┛┗┣┳┫┻┠┯┨┷┝┰┥┸┿╂┍┒┙┖╼╽┎┑┚┕╾╿╴╵╷╶╸╹╻╺┈┄╌┉┅╍┊┆╎┋┇╏╭╮╯╰╔╗╝╚╒╕╜╙╠╦╣╩╟╤╢╧▬▮◀▲▶▼◂▴▸▾▭▯◁△▷▽◃▵▹▿◐◓◑◒◜◝◞◟◢◣◤◥◰◳◲◱◸◹◿◺",
			"ａ-ｚＡ-Ｚ０-９　｜アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨワヲンァィゥェォャュョッ｜・゛゜︑︑︒︒︐︐．．︓︓︔︔︕︕︖︖〝〟⋀⋁⋀⋁＞＜＞＜︵︶︵︶﹁﹂﹁﹂﹃﹄﹇﹈﹇﹈︷︸︷︸︹︺︿﹀︽︾︻︼︰︙⋯⋮⋱⋰￪￫￬￩↑→↓←↗↘↙↖↕↔⇄⇅⇆⇵⇈⇉⇊⇇⇧⇨⇩⇦☝☞☟☜👆👉👇👈↾⇁⇃↼↿⇀⇂↽⇡⇢⇣⇠⇑⇒⇓⇐⇗⇘⇙⇖⇕⇔↥↦↧↤↟↠↡↞⬆➡⬇⬅│─┐┘└┌┬┤┴├┃━┓┛┗┏┳┫┻┣┯┨┷┠┰┥┸┝╂┿┒┙┖┍╽╾┑┚┕┎╿╼╵╷╶╴╹╻╺╸┊┆╎┋┇╏┈┄╌┉┅╍╮╯╰╭╗╝╚╔╕╜╙╒╦╣╩╠╤╢╧╟▮▬▲▶▼◀▴▸▾◂▯▭△▷▽◁▵▹▿◃◓◑◒◐◝◞◟◜◣◤◥◢◳◲◱◰◹◿◺◸" );
	}

	convert( from: string ): string
	{
		var ret = "";
		var characterArray = this.preprocess( from );
		var lineTextArray = this.lie( characterArray );
		var lineLength = characterArray.length;
		if( this.isLineSpaceEnabled() )
		{
			lineLength += ( lineLength - 1 ) / 2;
		}
		var addHalfSpace = false;
		if( ( this.templateTop() != this.templateTopCenter() || this.templateBottom() != this.templateBottomCenter() ) && lineLength % 2 != 1 )
		{
			++lineLength;
			addHalfSpace = true;
		}
		var lineIsEven = lineTextArray.length % 2 == 0;
		var addQuarterSpace = Math.floor( lineLength ) != lineLength;

		ret += this.templateTopLeftCorner();
		for( var i = 0; i < lineLength; ++i )
		{
			ret += i == Math.ceil( ( lineLength - 1 ) / 2 ) ? this.templateTopCenter() : this.templateTop();
		}
		ret += this.templateTopRightCorner() + this.templateNewLine;
		for( var i = 0; i < lineTextArray.length; ++i )
		{
			var center = i == Math.ceil( ( lineTextArray.length - 1 ) / 2 );
			ret += center ? this.templateLeftCenter() : this.templateLeft();
			if( addHalfSpace )
			{
				ret += this.templateHalfSpace;
			}
			if( addQuarterSpace )
			{
				ret += this.templateQuarterSpace;
			}
			ret += lineTextArray[i];
			if( addQuarterSpace )
			{
				ret += this.templateQuarterSpace;
			}
			if( addHalfSpace )
			{
				ret += this.templateHalfSpace;
			}
			ret += center ? this.templateRightCenter() : this.templateRight();
			ret += this.templateNewLine;
		}
		if( lineIsEven )
		{
			ret += this.templateLeft();
			if( addHalfSpace )
			{
				ret += this.templateHalfSpace;
			}
			if( addQuarterSpace )
			{
				ret += this.templateQuarterSpace;
			}
			for( var i = 0; i < characterArray.length; ++i )
			{
				ret += this.templateFullSpace;
			}
			if( addQuarterSpace )
			{
				ret += this.templateQuarterSpace;
			}
			if( addHalfSpace )
			{
				ret += this.templateHalfSpace;
			}
			ret += this.templateRight() + this.templateNewLine;
		}
		ret += this.templateBottomLeftCorner();
		for( var i = 0; i < lineLength; ++i )
		{
			ret += i == Math.ceil( ( lineLength - 1 ) / 2 ) ? this.templateBottomCenter() : this.templateBottom();
		}
		ret += this.templateBottomRightCorner();
		return ret;
	}

	private preprocess( text: string ): string[][]
	{
		var ret: string[][] = [];
		var charArray = TextSupport.getCharArray( text );

		var lineArray: string[] = [];
		for( var i = 0; i < charArray.length; ++i )
		{
			lineArray.push( this.convertToVerticalCharactor( charArray[i] ) );
			if( ( i + 1 ) % this.maximumCharactersOfALine() == 0 )
			{
				ret.push( lineArray );
				lineArray = [];
			}
		}
		if( lineArray.length != 0 )
		{
			ret.push( lineArray );
		}
		return ret;
	}

	private lie( preprocessTextArray: string[][] ): string[]
	{
		var ret: string[] = [];
		for( var i = 0; i < this.maximumCharactersOfALine(); ++i )
		{
			var lineText = "";
			for( var j = preprocessTextArray.length - 1; j >= 0; --j )
			{
				var line = preprocessTextArray[j];
				lineText += line.length > i ? line[i] : this.templateFullSpace;
				if( this.isLineSpaceEnabled() && j != 0 )
				{
					lineText += this.templateHalfSpace
				}
			}
			ret.push( lineText );
		}
		return ret;
	}

	private convertToVerticalCharactor( text: string ): string
	{
		for( var i in this.convertTable )
		{
			var fromTo = this.convertTable[i];
			if( text == fromTo[0] )
			{
				return fromTo[1];
			}
		}
		return text;
	}

	private createConvertTable( from: string, to: string ): string[][]
	{
		var fromTable = TextSupport.getCharArray( from );
		var toTable = TextSupport.getCharArray( to );
		if( fromTable.length != toTable.length )
		{
			return [];
		}

		var table: string[][] = [];
		for( var i = 0; i < fromTable.length; )
		{
			if( fromTable[i] == "-" && toTable[i] == "-" && i > 0 && i + 1 < fromTable.length )
			{
				table.pop();
				var fromStart = fromTable[i - 1].charCodeAt( 0 );
				var fromEnd = fromTable[i + 1].charCodeAt( 0 );
				var toStart = toTable[i - 1].charCodeAt( 0 );
				var toEnd = toTable[i + 1].charCodeAt( 0 );
				if( fromEnd - fromStart == toEnd - toStart )
				{
					var offset = toStart - fromStart;
					for( var j = fromStart; j <= fromEnd; ++j )
					{
						table.push( [String.fromCharCode( j ), String.fromCharCode( j + offset )] );
					}
					i += 2;
				}
				else
				{
					++i;
				}
			}
			else
			{
				table.push( [fromTable[i], toTable[i]] );
				++i;
			}
		}
		return table;
	}

	setTemplateNewLine( value: string ): void { this.templateNewLine = value; }
}
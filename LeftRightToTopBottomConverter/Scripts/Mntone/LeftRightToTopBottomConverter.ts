/// <reference path="TextSupport.ts" />

class LeftRightToTopBottomConverter
{
	private templateTopLeftCorner: string = "┏";
	private templateTopCenter: string = "┷";
	private templateTopRightCorner: string = "┓";
	private templateTop: string = "━";

	private templateBottomLeftCorner: string = "╰̚";
	private templateBottomCenter: string = "━";
	private templateBottomRightCorner: string = "┛⁾⁾";
	private templateBottom: string = "━";

	private templateLeft: string = "┃";
	private templateRight: string = "┃";

	private templateNewLine: string = "\n";

	convertTable: string[][];

	constructor()
	{
		this.convertTable = this.createConvertTable(
			"a-zA-Z0-9 ーｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾜｦﾝｧｨｩｪｫｬｭｮｯｰﾞﾟ,，､、｡。:：;；!！?？“”()（）「」｢｣『』[]［］{}｛｝〔〕<>〈〉《》‥…",
			"ａ-ｚＡ-Ｚ０－９　｜アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨワヲンァィゥェォャュョッ｜゛゜︐︐︑︑︒︒︓︓︔︔︕︕︖︖〝〟︵︶︵︶﹁﹂﹁﹂﹃﹄﹇﹈﹇﹈︷︸︷︸︹︺︿﹀︿﹀︽︾︰︙" );
	}

	convert( from: string ): string
	{
		var ret = this.templateTopLeftCorner + this.templateTopCenter + this.templateTopRightCorner + this.templateNewLine;

		var charArray = TextSupport.getCharArray( from );
		for( var i in charArray )
		{
			ret += this.templateLeft + this.normalize( charArray[i] ) + this.templateRight + this.templateNewLine;
		}

		ret += this.templateBottomLeftCorner + this.templateBottomCenter + this.templateBottomRightCorner;
		return ret;
	}

	private normalize( from: string ): string
	{
		for( var i in this.convertTable )
		{
			var fromTo = this.convertTable[i];
			if( from == fromTo[0] )
			{
				return fromTo[1];
			}
		}
		return from;
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
					for( var j = fromStart; j < fromEnd; ++j )
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

	setTemplateLeft( value: string ): void { this.templateLeft = value; }
	setTemplateRight( value: string ): void { this.templateRight = value; }
	setTemplateNewLine( value: string ): void { this.templateNewLine = value; }
}
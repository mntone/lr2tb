class TextSupport
{
	static getCharArray( text: string ): string[]
	{
		var ret: string[] = [];

		var length = text.length;
		for( var i = 0; i < length; )
		{
			var c = text.charAt( i );
			var cCode = text.charCodeAt( i++ );
			if( cCode >= 0xd800 && cCode <= 0xdbff )
			{
				if( i < length )
				{
					var cLow = text.charAt( i );
					var cLowCode = text.charCodeAt( i );
					if( cLowCode >= 0xdc00 && cLowCode <= 0xdfff )
					{
						ret.push( c + cLow );
					}
				}
				++i;
			}
			else
			{
				ret.push( c );
			}
		}

		return ret;
	}
} 
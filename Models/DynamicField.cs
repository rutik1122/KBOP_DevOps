using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iBAS.Models
{
    public class DynamicField
    {
		public string field_name { get; set; }
		public double field_score { get; set; }
		public string field_value { get; set; }
	}
	public class Fields
	{
		public IList<DynamicField> DynamicFields { get; set; }

	}
}
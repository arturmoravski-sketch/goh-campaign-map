{budgets
	{vehicle
		{mode "custom"}
		{resource
			{start		%s}
			{finish		%f}
			{growTime	1}
			{growTable	"1"}
			{payback
				{cp			"0	10	20	30	40	51"}
				{restore	"0	0	0	0	0	0"}
			}
			{limitmin	1000}
			{limitmax	11000}
			{speedset	"2500 3500 5000 7000 9000 11000"}
		}
		{buttons "inf1 inf2 empl vehicles tanks"}
	}
	{hero
		{resource
			{start %d}
		}
		{buttons "doctrine"}
		{tag "special"}
	}
}

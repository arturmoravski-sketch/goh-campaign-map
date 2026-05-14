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
			{limitmin	500}
			{limitmax	11000}
			{speedset	"625 833 875 1167 1250 1667 1750 2250 2333 2500 2750 3000 3500 3667 4500 5000 5500 7000 9000 11000"}
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

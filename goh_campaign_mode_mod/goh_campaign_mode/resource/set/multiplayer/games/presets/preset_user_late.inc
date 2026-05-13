; == GOH CAMPAIGN LATE WAR ==
(define "goh_campaign_late"
	{common
		{unitset
			{value "late^conquestonly|doctrineonly"}
		}
		{commandPoints "*=%cp"}
		{unitLimits ""}
		{balancingFactorBonus {cp 1.0}}
		{chargeFactors
			{value "*=0"}
			{customize "0;0.25;0.5;1;2"}
		}
		(include "global_parameters/budget_custom.inc" s(%start) f(%finish) d(%doctrine))
	}
	{bots
		(include "global_parameters/bots_generic.inc" period("late"))
	}
)

{presets
	{"c:late_goh_2500"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_2500"}
		{apply "only_roster_late"}
		("goh_campaign_late" start(2500) finish(2500) doctrine(2000) cp(1000))
	}
	{"c:late_goh_3500"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_3500"}
		{apply "only_roster_late"}
		("goh_campaign_late" start(3500) finish(3500) doctrine(2000) cp(1000))
	}
	{"c:late_goh_5000"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_5000"}
		{apply "only_roster_late"}
		("goh_campaign_late" start(5000) finish(5000) doctrine(2000) cp(1000))
	}
	{"c:late_goh_7000"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_7000"}
		{apply "only_roster_late"}
		("goh_campaign_late" start(7000) finish(7000) doctrine(2000) cp(1000))
	}
	{"c:late_goh_9000"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_9000"}
		{apply "only_roster_late"}
		("goh_campaign_late" start(9000) finish(9000) doctrine(2000) cp(1000))
	}
	{"c:late_goh_11000"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_11000"}
		{apply "only_roster_late"}
		("goh_campaign_late" start(11000) finish(11000) doctrine(2000) cp(1000))
	}
}

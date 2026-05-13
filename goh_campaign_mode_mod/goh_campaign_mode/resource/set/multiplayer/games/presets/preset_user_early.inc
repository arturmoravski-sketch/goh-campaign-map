; == GOH CAMPAIGN EARLY WAR ==
(define "goh_campaign_early"
	{common
		{unitset
			{value "early^conquestonly|doctrineonly"}
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
		(include "global_parameters/bots_generic.inc" period("early"))
	}
)

{presets
	{"c:early_goh_2500"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_2500"}
		{apply "only_roster_early"}
		("goh_campaign_early" start(2500) finish(2500) doctrine(2000) cp(1000))
	}
	{"c:early_goh_3500"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_3500"}
		{apply "only_roster_early"}
		("goh_campaign_early" start(3500) finish(3500) doctrine(2000) cp(1000))
	}
	{"c:early_goh_5000"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_5000"}
		{apply "only_roster_early"}
		("goh_campaign_early" start(5000) finish(5000) doctrine(2000) cp(1000))
	}
	{"c:early_goh_7000"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_7000"}
		{apply "only_roster_early"}
		("goh_campaign_early" start(7000) finish(7000) doctrine(2000) cp(1000))
	}
	{"c:early_goh_9000"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_9000"}
		{apply "only_roster_early"}
		("goh_campaign_early" start(9000) finish(9000) doctrine(2000) cp(1000))
	}
	{"c:early_goh_11000"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_11000"}
		{apply "only_roster_early"}
		("goh_campaign_early" start(11000) finish(11000) doctrine(2000) cp(1000))
	}
}

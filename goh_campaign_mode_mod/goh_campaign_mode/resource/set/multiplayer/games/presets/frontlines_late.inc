; == LATE WAR STANDARD RESOURCES ==

(include "global_parameters/frontlines/timers_frontlines.inc")

(define "standard_all"
	{teams
		{a ;// ATTACKER TEAM
			{unitset
				{value "late^conquestonly|doctrineonly"}
			}
			{commandPoints "*=1000"}
			(include "global_parameters/frontlines/unitlimits_attacker.inc")
			{chargeFactors
				("timers_attacker")
			}
			(include "global_parameters/frontlines/budget_attacker.inc" s(%start_a) f(%finish_a) d(%doctrine_a) r(%reinforcement_a))
		}
		{b ;// DEFENDER TEAM
			{unitset
				{value "late|frontlines^conquestonly|doctrineonly"}
			}
			{commandPoints "*=1000"}
			(include "global_parameters/frontlines/unitlimits_defender.inc")
			{chargeFactors
				("timers_defender")
			}
			(include "global_parameters/frontlines/budget_defender.inc" s(%start_b) f(%finish_b) d(%doctrine_b))
		}
	}

	{bots
		(include "global_parameters/frontlines/bots_standard.inc" period("late") start_a(%start_a) finish_a(%finish_a) reinforcement_a(%reinforcement_a) start_b(%start_b) finish_b(%finish_b) doctrine_a(%doctrine_a) doctrine_b(%doctrine_b) cp_a(%cp_a) cp_b(%cp_b))
	}
)


; == LATE WAR CUSTOM RESOURCES ==
(define "custom_all"
	{common

	}
	{teams
		{a ;// ATTACKER TEAM
			{unitset
				{value "late^conquestonly|doctrineonly"}
			}
			{commandPoints "*=1000"}
			(include "global_parameters/frontlines/unitlimits_attacker.inc")
			{chargeFactors
				("timers_attacker")
			}
			(include "global_parameters/frontlines/budget_attacker_custom.inc" s(%start_a) f(%finish_a) d(%doctrine_a) r(%reinforcement_a))
		}
		{b ;// DEFENDER TEAM
			{unitset
				{value "late|frontlines^conquestonly|doctrineonly"}
			}
			{commandPoints "*=1000"}
			(include "global_parameters/frontlines/unitlimits_defender.inc")
			{chargeFactors
				("timers_defender")
			}
			(include "global_parameters/frontlines/budget_defender_custom.inc" s(%start_b) f(%finish_b) d(%doctrine_b))
		}
	}

	{bots
		(include "global_parameters/frontlines/bots_custom.inc" period("late") start_a(%start_a) finish_a(%finish_a) reinforcement_a(%reinforcement_a) start_b(%start_b) finish_b(%finish_b) doctrine_a(%doctrine_a) doctrine_b(%doctrine_b) cp_a(%cp_a) cp_b(%cp_b))
	}
)


; == LATE WAR TEST ==
(define "test_late"
	{teams
		{a ;// ATTACKER TEAM
			{unitset
				{value "late^conquestonly|doctrineonly"}
			}
			{commandPoints "*=1000"}
			{unitLimits ""}
			{chargeFactors
				{value "*=0"}
			}
			(include "global_parameters/frontlines/budget_attacker.inc" s(%start_a) f(%finish_a) d(%doctrine_a) r(%reinforcement_a))
		}
		{b ;// DEFENDER TEAM
			{unitset
				{value "late|frontlines^conquestonly|doctrineonly"}
			}
			{commandPoints "*=1000"}
			{unitLimits ""}
			{chargeFactors
				{value "*=0"}
			}
			(include "global_parameters/frontlines/budget_defender.inc" s(%start_b) f(%finish_b) d(%doctrine_b))
		}
	}

	{bots
		(include "global_parameters/frontlines/bots_standard.inc" period("late") start_a(%start_a) finish_a(%finish_a) reinforcement_a(%reinforcement_a) start_b(%start_b) finish_b(%finish_b) doctrine_a(%doctrine_a) doctrine_b(%doctrine_b) cp_a(%cp_a) cp_b(%cp_b))
	}
)

;------------------------------------------------------------------------------------------------------------
{presets
	{"s:late_standard_80"
		{gameMode "standard"}
		{unitMode "late"}
		{specMode "all_normal"}
		{apply "only_roster_late"}
		("standard_all"			start_a(11000) finish_a(11000) reinforcement_a(0) start_b(11000) finish_b(11000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
		{ranked}
	}
;------------------------------------------------------------------------------------------------------------

; // GOH campaign presets

	{"c:late_goh_2500"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_2500"}
		{apply "only_roster_late"}
		("test_late"			start_a(2500) finish_a(2500) reinforcement_a(0) start_b(2500) finish_b(2500) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:late_goh_3500"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_3500"}
		{apply "only_roster_late"}
		("test_late"			start_a(3500) finish_a(3500) reinforcement_a(0) start_b(3500) finish_b(3500) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:late_goh_5000"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_5000"}
		{apply "only_roster_late"}
		("test_late"			start_a(5000) finish_a(5000) reinforcement_a(0) start_b(5000) finish_b(5000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:late_goh_7000"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_7000"}
		{apply "only_roster_late"}
		("test_late"			start_a(7000) finish_a(7000) reinforcement_a(0) start_b(7000) finish_b(7000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:late_goh_9000"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_9000"}
		{apply "only_roster_late"}
		("test_late"			start_a(9000) finish_a(9000) reinforcement_a(0) start_b(9000) finish_b(9000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:late_goh_11000"
		{gameMode "custom"}
		{unitMode "late"}
		{specMode "goh_11000"}
		{apply "only_roster_late"}
		("test_late"			start_a(11000) finish_a(11000) reinforcement_a(0) start_b(11000) finish_b(11000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
;------------------------------------------------------------------------------------------------------------

	{"s:test_late"
		{gameMode "test"}
		{unitMode "late"}
		{specMode "all_normal"}
		{apply "only_roster_late"}
		("test_late"			start_a(11000) finish_a(11000) reinforcement_a(0) start_b(11000) finish_b(11000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
}
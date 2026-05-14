; == EARLY WAR STANDARD RESOURCES ==

(include "global_parameters/frontlines/timers_frontlines.inc")

(define "standard_all"
	{teams
		{a ;// ATTACKER TEAM
			{unitset
				{value "early^conquestonly|doctrineonly"}
			}
			{commandPoints "*=%cp_a"}
			(include "global_parameters/frontlines/unitlimits_attacker.inc")
			{chargeFactors
				("timers_attacker")
			}
			(include "global_parameters/frontlines/budget_attacker.inc" s(%start_a) f(%finish_a) d(%doctrine_a) r(%reinforcement_a))
		}
		{b ;// DEFENDER TEAM
			{unitset
				{value "early|frontlines^conquestonly|doctrineonly"}
			}
			{commandPoints "*=%cp_b"}
			(include "global_parameters/frontlines/unitlimits_defender.inc")
			{chargeFactors
				("timers_defender")
			}
			(include "global_parameters/frontlines/budget_defender.inc" s(%start_b) f(%finish_b) d(%doctrine_b))
		}
	}

	{bots
		(include "global_parameters/frontlines/bots_standard.inc" period("early") start_a(%start_a) finish_a(%finish_a) reinforcement_a(%reinforcement_a) start_b(%start_b) finish_b(%finish_b) doctrine_a(%doctrine_a) doctrine_b(%doctrine_b) cp_a(%cp_a) cp_b(%cp_b))
	}
)


; == EARLY WAR CUSTOM RESOURCES ==

(define "custom_all"
	{common

	}
	{teams
		{a ;// ATTACKER TEAM
			{unitset
				{value "early^conquestonly|doctrineonly"}
			}
			{commandPoints "*=%cp_a"}
			(include "global_parameters/frontlines/unitlimits_attacker.inc")
			{chargeFactors
				("timers_attacker")
			}
			(include "global_parameters/frontlines/budget_attacker_custom.inc" s(%start_a) f(%finish_a) d(%doctrine_a) r(%reinforcement_a))
		}
		{b ;// DEFENDER TEAM
			{unitset
				{value "early|frontlines^conquestonly|doctrineonly"}
			}
			{commandPoints "*=%cp_b"}
			(include "global_parameters/frontlines/unitlimits_defender.inc")
			{chargeFactors
				("timers_defender")
			}
			(include "global_parameters/frontlines/budget_defender_custom.inc" s(%start_b) f(%finish_b) d(%doctrine_b))
		}
	}

	{bots
		(include "global_parameters/frontlines/bots_custom.inc" period("early") start_a(%start_a) finish_a(%finish_a) reinforcement_a(%reinforcement_a) start_b(%start_b) finish_b(%finish_b) doctrine_a(%doctrine_a) doctrine_b(%doctrine_b) cp_a(%cp_a) cp_b(%cp_b))
	}
)


; == EARLY WAR TEST ==
(define "test_early"
	{teams
		{a ;// ATTACKER TEAM
			{unitset
				{value "early^conquestonly|doctrineonly"}
			}
			{commandPoints "*=%cp_a"}
			{unitLimits ""}
			{chargeFactors
				{value "*=0"}
			}
			(include "global_parameters/frontlines/budget_attacker.inc" s(%start_a) f(%finish_a) d(%doctrine_a) r(%reinforcement_a))
		}
		{b ;// DEFENDER TEAM
			{unitset
				{value "early|frontlines^conquestonly|doctrineonly"}
			}
			{commandPoints "*=%cp_b"}
			{unitLimits ""}
			{chargeFactors
				{value "*=0"}
			}
			(include "global_parameters/frontlines/budget_defender.inc" s(%start_b) f(%finish_b) d(%doctrine_b))
		}
	}

	{bots
		(include "global_parameters/frontlines/bots_standard.inc" period("early") start_a(%start_a) finish_a(%finish_a) reinforcement_a(%reinforcement_a) start_b(%start_b) finish_b(%finish_b) doctrine_a(%doctrine_a) doctrine_b(%doctrine_b) cp_a(%cp_a) cp_b(%cp_b))
	}
)

;------------------------------------------------------------------------------------------------------------
{presets
	{"s:early_standard_80"
		{gameMode "standard"}
		{unitMode "early"}
		{specMode "all_normal"}
		{apply "only_roster_early"}
		("standard_all"			start_a(11000) finish_a(11000) reinforcement_a(0) start_b(11000) finish_b(11000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
		{ranked}
	}
;------------------------------------------------------------------------------------------------------------

; // GOH campaign presets

	{"c:early_goh_2500"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_2500"}
		{apply "only_roster_early"}
		("test_early"			start_a(2500) finish_a(2500) reinforcement_a(0) start_b(2500) finish_b(2500) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:early_goh_3500"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_3500"}
		{apply "only_roster_early"}
		("test_early"			start_a(3500) finish_a(3500) reinforcement_a(0) start_b(3500) finish_b(3500) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:early_goh_5000"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_5000"}
		{apply "only_roster_early"}
		("test_early"			start_a(5000) finish_a(5000) reinforcement_a(0) start_b(5000) finish_b(5000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:early_goh_7000"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_7000"}
		{apply "only_roster_early"}
		("test_early"			start_a(7000) finish_a(7000) reinforcement_a(0) start_b(7000) finish_b(7000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:early_goh_9000"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_9000"}
		{apply "only_roster_early"}
		("test_early"			start_a(9000) finish_a(9000) reinforcement_a(0) start_b(9000) finish_b(9000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
	{"c:early_goh_11000"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_11000"}
		{apply "only_roster_early"}
		("test_early"			start_a(11000) finish_a(11000) reinforcement_a(0) start_b(11000) finish_b(11000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
; // GOH campaign team-total presets
; // Use these on maps where one player controls 2 side slots
	{"c:early_goh_2500_team2"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_2500_team2"}
		{apply "only_roster_early"}
		("test_early"			start_a(1250) finish_a(1250) reinforcement_a(0) start_b(1250) finish_b(1250) doctrine_a(1000) doctrine_b(1000) cp_a(500) cp_b(500))
	}
	{"c:early_goh_3500_team2"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_3500_team2"}
		{apply "only_roster_early"}
		("test_early"			start_a(1750) finish_a(1750) reinforcement_a(0) start_b(1750) finish_b(1750) doctrine_a(1000) doctrine_b(1000) cp_a(500) cp_b(500))
	}
	{"c:early_goh_5000_team2"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_5000_team2"}
		{apply "only_roster_early"}
		("test_early"			start_a(2500) finish_a(2500) reinforcement_a(0) start_b(2500) finish_b(2500) doctrine_a(1000) doctrine_b(1000) cp_a(500) cp_b(500))
	}
	{"c:early_goh_7000_team2"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_7000_team2"}
		{apply "only_roster_early"}
		("test_early"			start_a(3500) finish_a(3500) reinforcement_a(0) start_b(3500) finish_b(3500) doctrine_a(1000) doctrine_b(1000) cp_a(500) cp_b(500))
	}
	{"c:early_goh_9000_team2"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_9000_team2"}
		{apply "only_roster_early"}
		("test_early"			start_a(4500) finish_a(4500) reinforcement_a(0) start_b(4500) finish_b(4500) doctrine_a(1000) doctrine_b(1000) cp_a(500) cp_b(500))
	}
	{"c:early_goh_11000_team2"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_11000_team2"}
		{apply "only_roster_early"}
		("test_early"			start_a(5500) finish_a(5500) reinforcement_a(0) start_b(5500) finish_b(5500) doctrine_a(1000) doctrine_b(1000) cp_a(500) cp_b(500))
	}
; // Use these on maps where one player controls 3 side slots
	{"c:early_goh_2500_team3"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_2500_team3"}
		{apply "only_roster_early"}
		("test_early"			start_a(833) finish_a(833) reinforcement_a(0) start_b(833) finish_b(833) doctrine_a(667) doctrine_b(667) cp_a(333) cp_b(333))
	}
	{"c:early_goh_3500_team3"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_3500_team3"}
		{apply "only_roster_early"}
		("test_early"			start_a(1167) finish_a(1167) reinforcement_a(0) start_b(1167) finish_b(1167) doctrine_a(667) doctrine_b(667) cp_a(333) cp_b(333))
	}
	{"c:early_goh_5000_team3"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_5000_team3"}
		{apply "only_roster_early"}
		("test_early"			start_a(1667) finish_a(1667) reinforcement_a(0) start_b(1667) finish_b(1667) doctrine_a(667) doctrine_b(667) cp_a(333) cp_b(333))
	}
	{"c:early_goh_7000_team3"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_7000_team3"}
		{apply "only_roster_early"}
		("test_early"			start_a(2333) finish_a(2333) reinforcement_a(0) start_b(2333) finish_b(2333) doctrine_a(667) doctrine_b(667) cp_a(333) cp_b(333))
	}
	{"c:early_goh_9000_team3"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_9000_team3"}
		{apply "only_roster_early"}
		("test_early"			start_a(3000) finish_a(3000) reinforcement_a(0) start_b(3000) finish_b(3000) doctrine_a(667) doctrine_b(667) cp_a(333) cp_b(333))
	}
	{"c:early_goh_11000_team3"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_11000_team3"}
		{apply "only_roster_early"}
		("test_early"			start_a(3667) finish_a(3667) reinforcement_a(0) start_b(3667) finish_b(3667) doctrine_a(667) doctrine_b(667) cp_a(333) cp_b(333))
	}
; // Use these on maps where one player controls 4 side slots
	{"c:early_goh_2500_team4"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_2500_team4"}
		{apply "only_roster_early"}
		("test_early"			start_a(625) finish_a(625) reinforcement_a(0) start_b(625) finish_b(625) doctrine_a(500) doctrine_b(500) cp_a(250) cp_b(250))
	}
	{"c:early_goh_3500_team4"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_3500_team4"}
		{apply "only_roster_early"}
		("test_early"			start_a(875) finish_a(875) reinforcement_a(0) start_b(875) finish_b(875) doctrine_a(500) doctrine_b(500) cp_a(250) cp_b(250))
	}
	{"c:early_goh_5000_team4"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_5000_team4"}
		{apply "only_roster_early"}
		("test_early"			start_a(1250) finish_a(1250) reinforcement_a(0) start_b(1250) finish_b(1250) doctrine_a(500) doctrine_b(500) cp_a(250) cp_b(250))
	}
	{"c:early_goh_7000_team4"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_7000_team4"}
		{apply "only_roster_early"}
		("test_early"			start_a(1750) finish_a(1750) reinforcement_a(0) start_b(1750) finish_b(1750) doctrine_a(500) doctrine_b(500) cp_a(250) cp_b(250))
	}
	{"c:early_goh_9000_team4"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_9000_team4"}
		{apply "only_roster_early"}
		("test_early"			start_a(2250) finish_a(2250) reinforcement_a(0) start_b(2250) finish_b(2250) doctrine_a(500) doctrine_b(500) cp_a(250) cp_b(250))
	}
	{"c:early_goh_11000_team4"
		{gameMode "custom"}
		{unitMode "early"}
		{specMode "goh_11000_team4"}
		{apply "only_roster_early"}
		("test_early"			start_a(2750) finish_a(2750) reinforcement_a(0) start_b(2750) finish_b(2750) doctrine_a(500) doctrine_b(500) cp_a(250) cp_b(250))
	}
;------------------------------------------------------------------------------------------------------------

	{"s:test_early"
		{gameMode "test"}
		{unitMode "early"}
		{specMode "all_normal"}
		{apply "only_roster_early"}
		("test_early"			start_a(11000) finish_a(11000) reinforcement_a(0) start_b(11000) finish_b(11000) doctrine_a(2000) doctrine_b(2000) cp_a(1000) cp_b(1000))
	}
}

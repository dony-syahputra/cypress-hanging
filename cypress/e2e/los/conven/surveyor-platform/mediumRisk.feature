@ProjectKey-BLOS
Feature: Medium Risk E2E

        Background: 
            Given Surveyor visit surveyor platform
            When Surveyor login with '4W' credentials
            Then Surveyor should be able to see home page 

        #use assetNumber = 0 if want to run with custom assignmentID
        @BLOS-T2052
        Scenario Outline:  #MA1 Verify Multiple Asset (Medium) - Scoring Result is NO_ADJUSTMENT for Category SJMB and NON_TAKEOVER
            Then Create Follow Up Data for '4W' with risk is 'medium' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'medium' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in Simple Survey Form with Scoring Result 'passed'
            Then Surveyor fill in 'medium_risk' Scoring Form with 'non-takeover' and scoring result 'passed'
            Then Surveyor Verify Scoring Form Result is 'passed'
            And Surveyor Fill in Personal Data with Martial Status is 'M'
            And Surveyor Fill in Residence Address Data with Same Domicile is 'true'
            And Surveyor Fill in Job Details Form
            And Surveyor Fill in Emergency Contact Form
            And Surveyor Fill in Asset Verification Form 
            And Surveyor Fill in Document Signing Form
            And Surveyor Click Kembali Keberanda Button
            And Surveyor Do Document Submission with "418" processing branch 
            Then Surveyor Verify Assignment Status is "Dokumen Diserahkan" in Assignment History

            
            Examples:
                | assignmentId | assetNumber |
                | 30830  | 1 |

        @BLOS-T2053
        Scenario Outline:  #MA2 Verify Multiple Asset (Medium) - Scoring Result is NO_ADJUSTMENT for Category SJMB and TAKE OVER
            Then Create Follow Up Data for '4W' with risk is 'medium' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'medium' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in Simple Survey Form with Scoring Result 'passed'
            Then Surveyor fill in 'medium_risk' Scoring Form with 'takeover' and scoring result 'passed'
            Then Surveyor Verify Scoring Form Result is 'passed'
            And Surveyor Fill in Personal Data with Martial Status is 'S'
            And Surveyor Fill in Residence Address Data with Same Domicile is 'true'
            And Surveyor Fill in Job Details Form
            And Surveyor Fill in Emergency Contact Form
            And Surveyor Fill in Asset Verification Form 
            And Surveyor Fill in Document Signing Form
            And Surveyor Click Kembali Keberanda Button
            And Surveyor Do Document Submission with "418" processing branch 
            Then Surveyor Verify Assignment Status is "Dokumen Diserahkan" in Assignment History

            
            Examples:
                | assignmentId | assetNumber |
                | 30830  | 1 |

        @BLOS-T2054
        Scenario Outline:  #MA3 Verify Multiple Asset (Medium) - Scoring Result is ADJUSTED for Category SJMB and NON_TAKEOVER
            Then Create Follow Up Data for '4W' with risk is 'medium' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'medium' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in Simple Survey Form with Scoring Result 'adjusted'
            Then Surveyor fill in 'medium_risk' Scoring Form with 'non-takeover' and scoring result 'adjusted'
            Then Surveyor Verify Scoring Form Result is 'passed'
            And Surveyor Fill in Personal Data with Martial Status is 'S'
            And Surveyor Fill in Residence Address Data with Same Domicile is 'true'
            And Surveyor Fill in Job Details Form
            And Surveyor Fill in Emergency Contact Form
            And Surveyor Fill in Asset Verification Form 
            And Surveyor Fill in Document Signing Form
            And Surveyor Click Kembali Keberanda Button
            And Surveyor Do Document Submission with "418" processing branch 
            Then Surveyor Verify Assignment Status is "Dokumen Diserahkan" in Assignment History

            
            Examples:
                | assignmentId | assetNumber |
                | 30830  | 1 |

        @BLOS-T2055
        Scenario Outline:  #MA4 Verify Multiple Asset (Medium) - Scoring Result is ADJUSTED for Category SJMB and TAKE OVER
            Then Create Follow Up Data for '4W' with risk is 'medium' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'medium' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in Simple Survey Form with Scoring Result 'adjusted'
            Then Surveyor fill in 'medium_risk' Scoring Form with 'takeover' and scoring result 'adjusted'
            Then Surveyor Verify Scoring Form Result is 'passed'
            And Surveyor Fill in Personal Data with Martial Status is 'S'
            And Surveyor Fill in Residence Address Data with Same Domicile is 'true'
            And Surveyor Fill in Job Details Form
            And Surveyor Fill in Emergency Contact Form
            And Surveyor Fill in Asset Verification Form 
            And Surveyor Fill in Document Signing Form
            And Surveyor Click Kembali Keberanda Button
            And Surveyor Do Document Submission with "418" processing branch 
            Then Surveyor Verify Assignment Status is "Dokumen Diserahkan" in Assignment History

            
            Examples:
                | assignmentId | assetNumber |
                | 30830  | 1 |

        @BLOS-T2106
        Scenario Outline:  #MA10 Verify Multiple Asset (Medium) - Partial Scoring Result is NO_ADJUSTMENT and REJECTED for Category SJMB and NON_TAKEOVER
            Then Create Follow Up Data for '4W' with risk is 'medium' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'medium' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in Simple Survey Form with Scoring Result 'partial'
            Then Surveyor fill in 'medium_risk' Scoring Form with 'non-takeover' and scoring result 'partial'
            Then Surveyor Verify Scoring Form Result is 'passed'
            And Surveyor Fill in Personal Data with Martial Status is 'S'
            And Surveyor Fill in Residence Address Data with Same Domicile is 'true'
            And Surveyor Fill in Job Details Form
            And Surveyor Fill in Emergency Contact Form
            And Surveyor Fill in Asset Verification Form 
            And Surveyor Fill in Document Signing Form
            And Surveyor Click Kembali Keberanda Button
            And Surveyor Do Document Submission with "418" processing branch 
            Then Surveyor Verify Assignment Status is "Dokumen Diserahkan" in Assignment History

            
            Examples:
                | assignmentId | assetNumber |
                | 30830  | 2 |


        @BLOS-T7628
        Scenario Outline:  #MA11 Verify Multiple Asset (Medium) - Partial Scoring Result is NO_ADJUSTMENT and REJECTED for Category SJMB and TAKEOVER
            Then Create Follow Up Data for '4W' with risk is 'medium' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'medium' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in Simple Survey Form with Scoring Result 'partial'
            Then Surveyor fill in 'medium_risk' Scoring Form with 'takeover' and scoring result 'partial'
            Then Surveyor Verify Scoring Form Result is 'passed'
            And Surveyor Fill in Personal Data with Martial Status is 'S'
            And Surveyor Fill in Residence Address Data with Same Domicile is 'true'
            And Surveyor Fill in Job Details Form
            And Surveyor Fill in Emergency Contact Form
            And Surveyor Fill in Asset Verification Form 
            And Surveyor Fill in Document Signing Form
            And Surveyor Click Kembali Keberanda Button
            And Surveyor Do Document Submission with "418" processing branch 
            Then Surveyor Verify Assignment Status is "Dokumen Diserahkan" in Assignment History

            
            Examples:
                | assignmentId | assetNumber |
                | 30830  | 2 |

        @BLOS-T5058
        Scenario Outline:Verify Multiple Asset (Medium) - Scoring Result is REJECTED for Category SJMB
            Then Create Follow Up Data for '4W' with risk is 'low' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'low' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in Simple Survey Form with Scoring Result 'rejected'
            Then Surveyor fill in 'medium_risk' Scoring Form with 'takeover' and scoring result 'rejected'
            Then Surveyor Verify Scoring Form Result is 'rejected'
            Examples:
                | assignmentId | assetNumber |
                | 30830  | 1 |
        
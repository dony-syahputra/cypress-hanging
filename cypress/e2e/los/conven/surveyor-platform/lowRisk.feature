@ProjectKey-BLOS
Feature: Low Risk E2E

        Background: 
            Given Surveyor visit surveyor platform
            When Surveyor login with '4W' credentials
            Then Surveyor should be able to see home page 

     
        @BLOS-T2073
        Scenario Outline: Verify Multiple Asset (Low) - Scoring Result is PASS for Category SJMB and TAKE OVER
            Then Create Follow Up Data for '4W' with risk is 'low' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'low' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in 'low_risk' Scoring Form with 'takeover' and scoring result 'passed'
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
                | 31755  | 1 |


        @BLOS-T2075
        Scenario Outline: Verify Multiple Asset (Low) - Scoring Result is PASS for Category SJMB and NON TAKE OVER
            Then Create Follow Up Data for '4W' with risk is 'low' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'low' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in 'low_risk' Scoring Form with 'non-takeover' and scoring result 'passed'
            Then Surveyor Verify Scoring Form Result is 'passed'
            And Surveyor Fill in Personal Data with Martial Status is 'S'
            And Surveyor Fill in Residence Address Data with Same Domicile is 'false'
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
                
        
        @BLOS-T2095
        Scenario Outline: Verify Multiple Asset (Low) - Partial Result is PASS and NOT PASS for Category SJMB and TAKE OVER
            Then Create Follow Up Data for '4W' with risk is 'low' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'low' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in 'low_risk' Scoring Form with 'takeover' and scoring result 'partial'
            Then Surveyor Verify Scoring Form Result is 'passed'
            And Surveyor Fill in Personal Data with Martial Status is 'S'
            And Surveyor Fill in Residence Address Data with Same Domicile is 'false'
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

        #use assetNumber = 0 if want to run with custom assignmentID
        @BLOS-T2094
        Scenario Outline: Verify Multiple Asset (Low) - Partial Result is PASS and NOT PASS for Category SJMB and NON TAKE OVER
            Then Create Follow Up Data for '4W' with risk is 'low' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'low' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in 'low_risk' Scoring Form with 'non-takeover' and scoring result 'partial'
            Then Surveyor Verify Scoring Form Result is 'passed'
            And Surveyor Fill in Personal Data with Martial Status is 'S'
            And Surveyor Fill in Residence Address Data with Same Domicile is 'false'
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
                

        @BLOS-T2083
        Scenario Outline: Verify Multiple Asset (Low) - Scoring Result is PASS for Category SJMB and TAKE OVER
            Then Create Follow Up Data for '4W' with risk is 'low' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'low' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in 'low_risk' Scoring Form with 'takeover' and scoring result 'rejected'
            Then Surveyor Verify Scoring Form Result is 'rejected'
            Examples:
                | assignmentId | assetNumber |
                | 30830  | 1 |
        

        @BLOS-T2085
        Scenario Outline: Verify Multiple Asset (Low) - Scoring Result is NOT PASS for Category SJMB and NON TAKE OVER
            Then Create Follow Up Data for '4W' with risk is 'low' and have '<assetNumber>' asset 
            And Surveyor open Assignment Saya page
            And Surveyor fill in Follow Up Assignment '<assignmentId>' Call Result
            Then Create Application Data for '4W' with risk is 'low' and have '<assetNumber>' asset
            And Surveyor fill in Assignment '<assignmentId>' Call Result and start survey
            Then Surveyor fill in 'low_risk' Scoring Form with 'non-takeover' and scoring result 'rejected'
            Then Surveyor Verify Scoring Form Result is 'rejected'
            Examples:
                | assignmentId | assetNumber |
                | 30830  | 1 |
        
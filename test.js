import React from 'react';
import withRouter from '../../../../SharedModules/Navigation/withRouter';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { Button } from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import * as MessageConstans from '../../../../SharedModules/Messages/ErrorMsgConstants';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import NativeDropDown from '../../../../SharedModules/Dropdowns/NativeDropDown';

function NursingFacilitySpansForm(props) {
  return (
    <form autoComplete="off">
      <div className="form-wrapper wrap-form-label">
        {props.editLTCData.edit ? (
          <div className="mui-custom-form input-md">
            <label className="MuiFormLabel-root MuiInputLabel-shrink">
              Void Indicator
            </label>
            <div className="sub-radio mt-0">
              <RadioGroup
                disabled={props.disableLTCForm}
                data-test="voidIndicatorBtn"
                row
                aria-label="eftactive"
                name="HideInactiveProviders"
                value={props?.ltcFormValues?.voidIndicator}
                onChange={props.LTCFormHandleChanges('voidIndicator')}
              >
                <FormControlLabel
                  disabled={props.disableLTCForm}
                  value="true"
                  id="void-yes-asc-edit"
                  control={<Radio id="fcVoidYes" color="primary" />}
                  label="Yes"
                />
                <FormControlLabel
                  disabled={props.disableLTCForm}
                  value="false"
                  id="void-no-asc-edit"
                  control={<Radio id="fcVoidNo" color="primary" />}
                  label="No"
                />
              </RadioGroup>
            </div>
          </div>
        ) : null}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="mui-custom-form input-md with-select">
            <KeyboardDatePicker
              disabled={props.enableLTCForm || props.disableLTCForm}
              required
              id="BegDate"
              label="Begin Date"
              format="MM/dd/yyyy"
              value={props.ltcFormValues.beginDate}
              onChange={props.handleBeginDateChange}
              InputProps={{
                id: 'BegDate',
              }}
              InputLabelProps={{
                shrink: true,
                for: 'BegDate',
              }}
              data-test="beginDate"
              placeholder="mm/dd/yyyy"
              maxDate={new Date('9999-12-31T13:00:00.000+0000')}
              helperText={
                props.errors && props.errors.beginDate
                  ? MessageConstans.MEMBER_MAINTENANCE_PLD_FORM_BEGIN_DATE
                  : props.errors && props.errors.beginDateInvalid
                  ? MessageConstans.BGDT_INVALID
                  : props.errors && props.errors.beginDateGreter
                  ? MessageConstans.MEMBER_MAINTENANCE_BEGINDATE_GRETER_ENDDATE
                  : props.errors && props.errors.beginEarilerMember
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_BEGIN_EARLIER_MEMBER
                  : props.errors && props.errors.beginDateDeath
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_DEATH_BEGIN
                  : props.errors && props.errors.ltcSpanOverLapError1
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_1
                  : props.errors && props.errors.ltcSpanOverLapError2
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_2
                  : props.errors && props.errors.ltcSpanOverLapError3
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_3
                  : props.errors && props.errors.ltcSpanOverLapError4
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_4
                  : props.errors && props.errors.ltcSpanOverLapError5
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_5
                  : props.errors && props.errors.ltcSpanOverLapError6
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_6
                  : props.errors && props.errors.ltcSpanOverLapError7
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_7
                  : null
              }
              error={
                props.errors && props.errors.beginDate
                  ? MessageConstans.MEMBER_MAINTENANCE_PLD_FORM_BEGIN_DATE
                  : props.errors && props.errors.beginDateInvalid
                  ? MessageConstans.BGDT_INVALID
                  : props.errors && props.errors.beginDateGreter
                  ? MessageConstans.MEMBER_MAINTENANCE_BEGINDATE_GRETER_ENDDATE
                  : props.errors && props.errors.beginEarilerMember
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_BEGIN_EARLIER_MEMBER
                  : props.errors && props.errors.beginDateDeath
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_DEATH_BEGIN
                  : props.errors && props.errors.ltcSpanOverLapError1
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_1
                  : props.errors && props.errors.ltcSpanOverLapError2
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_2
                  : props.errors && props.errors.ltcSpanOverLapError3
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_3
                  : props.errors && props.errors.ltcSpanOverLapError4
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_4
                  : props.errors && props.errors.ltcSpanOverLapError5
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_5
                  : props.errors && props.errors.ltcSpanOverLapError6
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_6
                  : props.errors && props.errors.ltcSpanOverLapError7
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP_7
                  : null
              }
            />
          </div>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="mui-custom-form input-md with-select">
            <KeyboardDatePicker
              id="endDate"
              label="End Date"
              format="MM/dd/yyyy"
              value={props.ltcFormValues.endDate}
              onChange={props.handleEndDateChange}
              InputProps={{
                id: 'endDate',
              }}
              InputLabelProps={{
                shrink: true,
                for: 'endDate',
              }}
              data-test="endDate"
              placeholder="mm/dd/yyyy"
              maxDate={new Date('9999-12-31T13:00:00.000+0000')}
              disabled={props.disableLTCForm}
              helperText={
                props.errors && props.errors.endDateDeath
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_DEATH
                  : props.errors && props.errors.endDateInvalid
                  ? MessageConstans.EDT_INVALID
                  : null
              }
              error={
                props.errors && props.errors.endDateDeath
                  ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_DEATH
                  : props.errors && props.errors.endDateInvalid
                  ? MessageConstans.EDT_INVALID
                  : null
              }
            />
          </div>
        </MuiPickersUtilsProvider>
        <NativeDropDown
          disabled={props.enableLTCForm || props.disableLTCForm}
          label="Nursing Facility Span Type"
          value={props.ltcFormValues.ltcSpanTypeCode}
          onChange={props.LTCFormHandleChanges('ltcSpanTypeCode')}
          inputProps={{ id: 'span_type' }}
          placeholder=""
          InputLabelProps={{
            shrink: true,
            for: 'span_type',
          }}
          errTxt={
            props.errors && props.errors.ltcSpanTypeCode
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTCSPANTYPECODE
              : props.errors && props.errors.ltcSpanDateError
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_SPAN
              : props.errors && props.errors.ltcSpanIll_XXHError
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_ILLEGAL_XXH
              : props.errors && props.errors.illegalNHH
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_ILLEGAL_NHH
              : props.errors && props.errors.illegalSNF
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_ILLEGAL_SNF
              : props.errors && props.errors.spanTypeError
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_PATIENT_SPAN
              : props.errors && props.errors.ltcOverlapError
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP
              : null
          }
          error={
            props.errors && props.errors.ltcSpanTypeCode
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTCSPANTYPECODE
              : props.errors && props.errors.ltcSpanDateError
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_SPAN
              : props.errors && props.errors.ltcSpanIll_XXHError
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_ILLEGAL_XXH
              : props.errors && props.errors.illegalNHH
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_ILLEGAL_NHH
              : props.errors && props.errors.illegalSNF
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_ILLEGAL_SNF
              : props.errors && props.errors.spanTypeError
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_PATIENT_SPAN
              : props.errors && props.errors.ltcOverlapError
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LTC_OVERLAP
              : null
          }
          dropdownList={
            props.nonVvDropdown &&
            props.nonVvDropdown['1039#B1'] &&
            props.nonVvDropdown['1039#B1'].map((each) => (
              <option selected key={each.code} value={each.code}>
                {each.code} - {each.longDescription}
              </option>
            ))
          }
          isRequired
        />
        <div className="line-break-div" />
        <div className="mui-custom-form with-select input-md">
          <TextField
            required
            disabled={props.enableLTCForm || props.disableLTCForm}
            id="provider_ID"
            label="Provider ID"
            value={props.ltcFormValues.providerAltID}
            onChange={props.LTCFormHandleChanges('providerAltID')}
            inputProps={{ maxLength: 15 }}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={
              props.errors && props.errors.providerID
                ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_PROVIDERID
                : props.errors && props.errors.invalidProvId
                ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_INVALID_PROV_ID
                : props.errors && props.errors.provIDmustError
                ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_PROV_ID_MUST
                : null
            }
            error={
              props.errors && props.errors.providerID
                ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_PROVIDERID
                : props.errors && props.errors.invalidProvId
                ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_INVALID_PROV_ID
                : props.errors && props.errors.provIDmustError
                ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_PROV_ID_MUST
                : null
            }
          />
        </div>
        <NativeDropDown
          disabled={props.enableLTCForm || props.disableLTCForm}
          required
          select
          label="Provider ID Type"
          value={props.ltcFormValues.providerAltIDType}
          onChange={props.LTCFormHandleChanges('providerAltIDType')}
          inputProps={{ id: 'provider_id_type' }}
          placeholder=""
          InputLabelProps={{
            shrink: true,
            for: 'provider_id_type',
          }}
          errTxt={
            props.errors && props.errors.providerIDType
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_PROVIDERIDTYPE
              : null
          }
          error={
            props.errors && props.errors.providerIDType
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_PROVIDERIDTYPE
              : null
          }
          dropdownList={
            props.addDropdowns &&
            props.addDropdowns['P1#P_ALT_ID_TY_CD'] &&
            props.addDropdowns['P1#P_ALT_ID_TY_CD'].map((each) => (
              <option selected key={each.code} value={each.code}>
                {each.code} - {each.longDescription}
              </option>
            ))
          }
          isRequired
        />
        <div className="mui-custom-form input-md">
          <div className="fm-inline-btn">
            <Button
              id="cliaNumberSearch"
              title="Validate"
              variant="outlined"
              color="primary"
              className="btn btn-primary"
              onClick={props.validateProvider}
              disabled={props.enableLTCForm || props.disableLTCForm}
            >
              <i className="fa fa-check" />
              Validate
            </Button>
          </div>
        </div>
        <div className="line-break-div" />
        <div className="mui-custom-form with-select input-md">
          <TextField
            disabled
            id="provider_name"
            label="Provider Name"
            value={
              props.ltcFormValues.providerVO.providerName
                ? props.ltcFormValues.providerVO.providerName
                : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="mui-custom-form with-select input-md">
          <TextField
            disabled
            id="provider_type_code"
            label="Provider Type Code"
            value={
              props.ltcFormValues.providerVO.typeCodeDesc
                ? props.ltcFormValues.providerVO.typeCodeDesc
                : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="line-break-div" />
        <div className="mui-custom-form with-select input-md field-xl">
          <TextField
            disabled
            id="provider_address"
            label="Provider Address"
            value={
              props.ltcFormValues?.providerVO?.provAddress1 +
              props.ltcFormValues?.providerVO?.provAddress2
                ? props.ltcFormValues?.providerVO?.provAddress1 +
                  props.ltcFormValues?.providerVO?.provAddress2
                : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="line-break-div" />
        <div className="mui-custom-form with-select input-md">
          <TextField
            disabled
            id="provider_phone"
            label="Provider Phone"
            value={
              props.ltcFormValues.providerVO.provPhone
                ? props.ltcFormValues.providerVO.provPhone
                : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="mui-custom-form with-select input-md">
          <TextField
            disabled
            id="provider_fax"
            label="Provider Fax"
            value={
              props.ltcFormValues.providerVO.provFax
                ? props.ltcFormValues.providerVO.provFax
                : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="mui-custom-form with-select input-md">
          <TextField
            disabled
            id="provider_email"
            label="Provider Email"
            value={
              props.ltcFormValues.providerVO.provEmail
                ? props.ltcFormValues.providerVO.provEmail
                : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <NativeDropDown
          disabled={props.enableLTCForm || props.disableLTCForm}
          label="Level of Care"
          value={props.ltcFormValues.levelOfCareCode}
          onChange={props.LTCFormHandleChanges('levelOfCareCode')}
          inputProps={{ id: 'levelofcare' }}
          placeholder=""
          InputLabelProps={{
            shrink: true,
            for: 'levelofcare',
          }}
          errTxt={
            props.errors && props.errors.levelOfCareCode
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LEVELOFCARE
              : null
          }
          error={
            props.errors && props.errors.levelOfCareCode
              ? MessageConstans.MEMBER_MAINTENANCE_LTC_FORM_LEVELOFCARE
              : null
          }
          dropdownList={
            props.addDropdowns &&
            props.addDropdowns['R1#B_LVL_OF_CARE_CD'] &&
            props.addDropdowns['R1#B_LVL_OF_CARE_CD'].map((each) => (
              <option selected key={each.code} value={each.code}>
                {each.description}
              </option>
            ))
          }
        />
      </div>
    </form>
  );
}

export default withRouter(NursingFacilitySpansForm);

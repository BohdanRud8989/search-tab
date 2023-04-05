import React, { useMemo, useState } from "react";
import {
  Checkbox,
  Divider,
  Input,
  Space,
  Switch,
  Button,
  Typography,
  Card,
  Result,
} from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import "./SearchTab.css";
import styled from "@emotion/styled";

const CheckboxGroup = Checkbox.Group;
const { Search } = Input;
const { Text } = Typography;

const StyledCard = styled(Card)`
  width: 500px;

  .ant-card-body {
    padding: 20px;
  }
`;

const StyledSearch = styled(Search)`
  .ant-input {
    border: none;
    padding: 0;
    padding-left: 2px;

    &:focus,
    &:focus-visible {
      outline-width: 3px;
      outline-style: solid;
      outline-color: white;
    }

    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      font-style: normal;
      font-weight: 475;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.5px;

      color: #343434;
    }
  }

  .ant-input-group-addon {
    display: none;
  }
`;

const StyledDivider = styled(Divider)`
  margin-top: 14px;
  margin-bottom: 23px;
  background: #ececec;
`;

const StyledSwitchContainer = styled(Space)`
  gap: 10px !important;
`;

const StyledSwitch = styled(Switch)`
  background-color: rgba(0, 28, 61, 0.08);
`;

const StyledCheckboxGroup = styled(CheckboxGroup)`
  gap: 17px;

  .ant-checkbox-group-item {
    margin-left: 0;
    gap: 15px;
    align-items: flex-end;

    &:first-of-type {
      margin-top: 16px;
    }

    :hover .ant-checkbox-inner {
      background-color: 457df1 !important;
      border-color: transparent;
    }

    .ant-checkbox {
      &:after {
        border: none;
      }
    }

    span:last-of-type {
      padding-left: 0;
      font-style: normal;
      font-weight: 475;
      font-size: 16px;
      line-height: 16px;
      /* identical to box height, or 100% */
      color: #343434;
      margin-bottom: 1px;
    }

    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #457df1;
      border-color: #457df1;

      &:after {
        transform: rotate(45deg) scale(1) translate(-31%, -73%);
      }
    }
    .ant-checkbox-inner {
      width: 22px;
      height: 22px;
      background: #ececec;
      border-radius: 8px;
      border: none;
    }
  }
`;

const StyledSwitchLabel = styled(Text)`
  font-style: normal;
  font-weight: 550;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 138% */
  letter-spacing: -0.5px;
  /* Black */
  color: #232323;
`;

const StyledButtonClearAll = styled(Button)`
  // font-family: 'Campton';
  font-style: normal;
  font-weight: 550;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 138% */
  letter-spacing: -0.5px;
  /* Black */
  color: #232323;
`;

const StyledButtonSave = styled(Button)`
  width: 87px;
  height: 38px;
  background: #60d09b;
  border-radius: 50px;

  &:hover {
    color: #60d09b !important;
    border-color: #60d09b !important;
  }

  .ant-typography {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;

    text-align: center;
    letter-spacing: -0.5px;
    color: #ffffff;
  }
`;

const COUNTRIES_LIST = [
  "Algeria",
  "Angola",
  "Andorra",
  "Albania",
  "Belgium",
  "France",
  "Great Britain",
  "Germany",
  "Scotland",
  "Ukraine",
  "USA",
];
const DEFAULT_SELECTED_COUNTRIES_LIST = ["Angola", "Albania"];

function SearchTab() {
  const [selectedCountriesList, setSelectedCountriesList] = useState<
    CheckboxValueType[]
  >(DEFAULT_SELECTED_COUNTRIES_LIST);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredCountries = useMemo(() => {
    let filteredCountries = COUNTRIES_LIST.filter((country) => {
      const isMatchedBySearch = country
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return showSelectedOnly
        ? selectedCountriesList.includes(country) && isMatchedBySearch
        : isMatchedBySearch;
    });
    return filteredCountries;
  }, [searchValue, showSelectedOnly, selectedCountriesList]);
  const noCountriesAvailable = filteredCountries.length < 1;

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const onShowSelectedOnly = (checked: boolean) => {
    setShowSelectedOnly(checked);
  };

  const onClearAll = () => {
    setSelectedCountriesList([]);
  };

  const onCheckboxGroupChanged = (list: CheckboxValueType[]) => {
    setSelectedCountriesList(list);
  };

  return (
    <StyledCard>
      <StyledSearch
        placeholder="Search"
        onSearch={onSearch}
        style={{ width: "100%" }}
      />
      <StyledDivider />
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <StyledSwitchContainer>
          <StyledSwitch
            defaultChecked={showSelectedOnly}
            onChange={onShowSelectedOnly}
          />
          <StyledSwitchLabel>Show selected only</StyledSwitchLabel>
        </StyledSwitchContainer>
        <StyledButtonClearAll type="text" onClick={onClearAll}>
          <Text strong>Clear all</Text>
        </StyledButtonClearAll>
      </Space>
      <Space
        direction="vertical"
        align="start"
        style={{
          height: "200px",
          width: "100%",
          overflowY: noCountriesAvailable ? undefined : "auto",
        }}
      >
        {noCountriesAvailable && (
          <Result title="There no suitable countries. Please try another filters." />
        )}
        <StyledCheckboxGroup
          className="checkboxGroupWrapper"
          options={filteredCountries}
          value={selectedCountriesList}
          onChange={onCheckboxGroupChanged}
        />
      </Space>
      <StyledDivider />
      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <StyledButtonSave shape="round">
          <Text strong>Save</Text>
        </StyledButtonSave>
      </Space>
    </StyledCard>
  );
}

export default SearchTab;

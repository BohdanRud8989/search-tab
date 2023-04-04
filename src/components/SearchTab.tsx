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

const CheckboxGroup = Checkbox.Group;
const { Search } = Input;
const { Text } = Typography;

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
    <Card style={{ width: 500 }}>
      <Search
        placeholder="Search and press enter"
        onSearch={onSearch}
        style={{ width: "100%" }}
      />
      <Divider />
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Space>
          <Switch
            defaultChecked={showSelectedOnly}
            onChange={onShowSelectedOnly}
          />

          <Text strong>Show selected only</Text>
        </Space>
        <Button type="text" onClick={onClearAll}>
          <Text strong>Clear all</Text>
        </Button>
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
        <CheckboxGroup
          className="checkboxGroupWrapper"
          options={filteredCountries}
          value={selectedCountriesList}
          onChange={onCheckboxGroupChanged}
        />
      </Space>
    </Card>
  );
}

export default SearchTab;

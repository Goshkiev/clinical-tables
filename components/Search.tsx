import React, {
  useState,
  FormEvent,
  useCallback,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import { compose, isEmpty, replaceSpacesByPlus, trim } from "../helpers/index";

import SearchService from "../services/search";

const useFormField = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );
  return { value, onChange };
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export function SearchForm(props) {
  const { onSuccess } = props;

  const searchField = useFormField();
  const prevSearchText = usePrevious(searchField.value);

  const handleSubmit = async (e: FormEvent) => {
    const { value } = searchField;

    e.preventDefault();
    if (!isEmpty(value) && prevSearchText !== value) {
      const terms = compose(replaceSpacesByPlus, trim)(value);
      const searchebleData = await SearchService.getSearchebleData({ terms });
      onSuccess(searchebleData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" id="search" {...searchField} />
        <input type="submit" value="Search" />
      </div>
    </form>
  );
}

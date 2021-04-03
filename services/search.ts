import API from "../configs/axios";
import {flattenObject} from '../helpers/index'
const ENDPOINT = '/npi_idv/v3/search';

/* eslint-disable no-unused-vars */
export enum TopHierarchicalNpiKeys {
  provider_type = "provider_type:provider_type",
  gender = "gender:gender",
  licenses = "licenses:licenses",
  name = "name:name",
  addr_practice = "addr_practice:addr_practice",
  addr_mailing = "addr_mailing:addr_mailing",
  name_other = "name_other:name_other",
  other_ids = "other_ids:otherIds",
  misc = "misc:misc",
}

interface SearchService {
  terms: string | string[],
  df?: string,
  ef?: string,
  maxList?: number
}

const searchService = formatter => async ({terms, df, ef, maxList = 10}:SearchService) => {
  const { data } = await API.get(ENDPOINT, {
    params: {
      terms,
      maxList,
      df,
      ef
    }
  });

  if(formatter) {
    return formatter(data)
  }

  return data
};

const searchebleDataFormatter = ([, , , searchedData]) => searchedData.reduce((acc, cur) => {
  const [name, npi, type, address] = cur;
  return [
    ...acc,
    {
      name,
      npi,
      type,
      address,
    },
  ];
}, []);

const userTableDataFormatter = ([, , additionaData]) => {
  return Object.entries(flattenObject(additionaData)).map(([key, val])=> {
    const prepKey = key.replace(/\d+/g, ".");
    return [prepKey, val];
  })
}

const getSearchebleData = searchService(searchebleDataFormatter)
const getUserTableData = searchService(userTableDataFormatter)

export default {
  getSearchebleData,
  getUserTableData
}
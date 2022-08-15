export const filterData = [
  // {
    // items: [
    //   { name: 'Sale', value: 'for-sale' },
    //   { name: 'Rent', value: 'for-rent' },
    // ],
    // placeholder: 'Purpose',
    // queryName: 'purpose',
  // },
  {
    items: [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
    ],
    placeholder: 'Rooms',
    queryName: 'roomsMin',
  },
  {
    items: [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
    ],
    placeholder: 'Baths',
    queryName: 'bathsMin',
  },
  {
    items: [
      { name: 'Apartment', value: '4' },
      { name: 'Townhouses', value: '16' },
      { name: 'Villas', value: '3' },
      { name: 'Penthouses', value: '18' },
      { name: 'Hotel Apartments', value: '21' },
      { name: 'Villa Compound', value: '19' },
      { name: 'Residential Plot', value: '14' },
      { name: 'Residential Floor', value: '12' },
      { name: 'Residential Building', value: '17' },
    ],
    placeholder: 'Property Type',
    queryName: 'categoryExternalID',
  },
  {
    items: [
      { name: '200', value: '200' },
      { name: '250', value: '250' },
      { name: '300', value: '300' },
      { name: '350', value: '350' },
      { name: '400', value: '400' },
      { name: '450', value: '450' },
      { name: '500', value: '500' },
      { name: '550', value: '550' },
      { name: '600', value: '600' },
      { name: '650', value: '650' },
      { name: '700', value: '700' },
      { name: '750', value: '750' },
      { name: '800', value: '800' },
      { name: '850', value: '850' },
      { name: '900', value: '900' },
      { name: '950', value: '950' },
      { name: '1,000', value: '1000' },
    ],
    placeholder: 'Max Price',
    queryName: 'maxPrice',
  },
  {
    items: [
      { name: 'Lowest Price', value: 'price-asc' },
      { name: 'Highest Price', value: 'price-des' },
      { name: 'Newest', value: 'date-asc' },
      { name: 'Oldest', value: 'date-desc' },
      { name: 'Verified', value: 'verified-score' },
      //{ name: 'City Level Score', value: 'city-level-score' },
    ],
    placeholder: 'Sort',
    queryName: 'sort',
  },
];


export const getNameByCateID = (id) => {
  var name = '';
  filterData.forEach((item) => {
    if (item.queryName == 'categoryExternalID') {
      item.items.forEach((t) => {
        if (t.value == '' + id) {
          name = t.name;
        }
      });
    }
  });
  return name;
};

export const getFilterValues = (filterValues) => {
  const {
    purpose,
    rentFrequency,
    categoryExternalID,
    minPrice,
    maxPrice,
    areaMax,
    roomsMin,
    bathsMin,
    sort,
    locationExternalIDs,
  } = filterValues;

  const values = [
    {
      name: 'purpose',
      value: purpose,
    },
    {
      name: 'rentFrequency',
      value: rentFrequency,
    },
    {
      name: 'minPrice',
      value: minPrice,
    },
    {
      name: 'maxPrice',
      value: maxPrice,
    },
    {
      name: 'areaMax',
      value: areaMax,
    },
    {
      name: 'roomsMin',
      value: roomsMin,
    },
    {
      name: 'bathsMin',
      value: bathsMin,
    },
    {
      name: 'sort',
      value: sort,
    },
    {
      name: 'locationExternalIDs',
      value: locationExternalIDs,
    },
    {
      name: 'categoryExternalID',
      value: categoryExternalID,
    },
  ];

  return values;
};

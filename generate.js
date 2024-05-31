const fs = require('fs')
const { faker } = require('@faker-js/faker')
const { Factory } = require('rosie')
const _ = require('lodash')

Factory.define('Record')
  .sequence('id')
  .attr('createdAt', () => faker.date.recent({ days: 10 }))
  .attr('updatedAt', ['createdAt'], (from, to = new Date()) => faker.date.between({ from, to }))

Factory.define('Business').extend('Record')
  .attr('name', () => faker.company.name())
  .attr('apiKey', () => faker.internet.password(40))

Factory.define('Category').extend('Record')
  .attr('name', () => faker.company.name())

Factory.define('BusinessCategory')
  .sequence('businessId')
  .sequence('categoryId')

Factory.define('Campaign').extend('Record')
  .sequence('businessId')
  .attr('name', () => faker.company.buzzPhrase())
  .attr('budget', () => 2000 + faker.number.int(18000))

Factory.define('Location').extend('Record')
  .sequence('businessId')
  .attr('latitude', () => faker.location.latitude({ min: 40.7079853, max: 40.7229593, precision: 14 }))
  .attr('longitude', () => faker.location.longitude({ min: -74.00791979999997, max: -74.0027179, precision: 14 }))

const categories = [
  Factory.build('Category', { name: 'Food Stores-Retail' }),
  Factory.build('Category', { name: 'Eating and Drinking Places' }),
  Factory.build('Category', { name: 'Other Medical Facilities' }),
  ...Factory.buildList('Category', 10),
]
const retail = _.find(categories, { name: 'Food Stores-Retail' })
const eating = _.find(categories, { name: 'Eating and Drinking Places' })
const other  = _.find(categories, { name: 'Other Medical Facilities' })

const businesses = [
  Factory.build('Business', { name: 'Blue Ribbon Federal Grill' }),
  ...Factory.buildList('Business', 25),
  Factory.build('Business', { name: 'Gourmet Garage' }),
  ...Factory.buildList('Business', 38),
  Factory.build('Business', { name: "Hank's Juicy Beef" }),
  ...Factory.buildList('Business', 34),
  Factory.build('Business', { name: 'Keste Wall Street' }),
  ...Factory.buildList('Business', 12),
  Factory.build('Business', { name: 'Unity Acupuncture' }),
  ...Factory.buildList('Business', 20)
]
const brfg = _.find(businesses, { name: 'Blue Ribbon Federal Grill' })
const gg   = _.find(businesses, { name: 'Gourmet Garage' })
const hjb  = _.find(businesses, { name: "Hank's Juicy Beef" })
const kws  = _.find(businesses, { name: 'Keste Wall Street' })
const ua   = _.find(businesses, { name: 'Unity Acupuncture' })

const businessesCategories = [
  Factory.build('BusinessCategory', { businessId: brfg.id, categoryId: retail.id }),
  Factory.build('BusinessCategory', { businessId: gg.id,   categoryId: retail.id }),
  Factory.build('BusinessCategory', { businessId: hjb.id,  categoryId: retail.id }),
  Factory.build('BusinessCategory', { businessId: kws.id,  categoryId: eating.id }),
  Factory.build('BusinessCategory', { businessId: ua.id,   categoryId: other.id }),
]

const campaigns = [
  Factory.build('Campaign', { budget: 3200,  businessId: brfg.id, name: 'Burger Bonanza'      }),
  Factory.build('Campaign', { budget: 8300,  businessId: brfg.id, name: 'Fried Chicken Sale'  }),
  Factory.build('Campaign', { budget: 2000,  businessId: brfg.id, name: 'Salad, salad salad!' }),
  Factory.build('Campaign', { budget: 20000, businessId: gg.id,   name: 'Lunch Time'          }),
  Factory.build('Campaign', { budget: 12000, businessId: hjb.id,  name: 'Sausage Sale'        }),
  Factory.build('Campaign', { budget: 6000,  businessId: hjb.id,  name: 'All the fixings'     }),
  Factory.build('Campaign', { budget: 12000, businessId: ua.id,   name: 'Campaign 1'          }),
  Factory.build('Campaign', { budget: 4870,  businessId: ua.id,   name: 'Campaign 2'          }),
  Factory.build('Campaign', { budget: 73048, businessId: ua.id,   name: 'Campaign 3'          }),
  Factory.build('Campaign', { budget: 9872,  businessId: ua.id,   name: 'Campaign 4'          }),
  Factory.build('Campaign', { budget: 17805, businessId: ua.id,   name: 'Campaign 5'          }),
  Factory.build('Campaign', { budget: 7100,  businessId: ua.id,   name: 'Campaign 6'          })
]

const locations = [
  Factory.build('Location', { businessId: brfg.id, latitude: 40.7079853,        longitude: -74.0077109 }),
  Factory.build('Location', { businessId: gg.id,   latitude: 40.7229593,        longitude: -74.0027179 }),
  Factory.build('Location', { businessId: hjb.id,  latitude: 40.7143487,        longitude: -74.00721469999996 }),
  Factory.build('Location', { businessId: kws.id,  latitude: 40.7092842,        longitude: -74.00492600000001 }),
  Factory.build('Location', { businessId: ua.id,   latitude: 40.71438860000001, longitude: -74.00791979999997 }),
]

for (const business of businesses) {
  const id = business.id
  if (!_.find(businessesCategories, { businessId: id })) {
    businessesCategories.push(Factory.build('BusinessCategory', {
      businessId: id,
      categoryId: _.sample(categories).id
    }))
  }

  if ((id != kws.id) && (!_.find(campaigns, { businessId: id }))) {
    campaigns.push(...Factory.buildList('Campaign', 3 + faker.number.int(10), { businessId: id }))
  }

  if (!_.find(locations, { businessId: id })) {
    locations.push(Factory.build('Location', { businessId: id }))
  }
}

const data = {
  categories,
  businesses,
  businessesCategories,
  campaigns,
  locations
}

for (const name in data) {
  const records = data[name]
  fs.writeFileSync(`./db/${name}.json`, JSON.stringify(records, null, 2))
}

# gainbridge-tests

<p>
    The sample web app being testing is a sample single page that doesn't have any real data layer and/or connections to other content. 
Assumptions were made to what should happen.
</p>

## UI Test Scenarios

1. Look and Feel
   - Confirm Title "Your Shopping Cart"
   - Confirm Nav menu items available
   - Validate fonts, font sizes and colors
   - Validate Accessibility such as Tabs usage, combination of Tabs and mouse clicks, etc.
1. Checkout Total goes up if quantities of items in the cart go up.
1. Checkout Total goes down if quanities of items in the cart go down.
1. The Bluetooth Headphones discount price of $85.00 stays as $85.00 the entire time of timer and then goes up to $100 since it was a 15% discount.
1. Clicking the Remove button for the item removes the item and the Checkout Total is updated.
1. Removing all Items fromt the cart reflects a Total checkout price of $0.
1. Evaluate Menu Nav Links
   - Link for Home goes to the Home page
   - Link for Profile goes to Profile of User
   - Link for Cart goes to Cart page, remains on the same page
   - Link for Products goes to Product Catalog page
1. Clicking the Checkout button should go to the Checkout/Payment page

## Performance Tests

This area describes what could be done for perforamnce testing. It is best to figure out the Service Level Indicators (SLIs) we are trying to achieve.

### API 

Primary focus would be on any APIs if they existed.
1. Benchmarks - 100 calls one after another, single user, average time response
   * No payload on calls
   * Single item in payload
   * Ten different items in Payload
   Helps figure SLAs
1. Concurrency Benchmark - Multiple say 100 users at the same time doing the same types of tests in Benchmark
   Helps figure SLAs
1. Stress - figure out the breaking point on APIs.

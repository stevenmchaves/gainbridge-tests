# gainbridge-tests

<p>
    The sample web app being testing is a single page that doesn't have any real data layer and/or connections to other content. 
Assumptions were made to what should have happened. Much of the functionality doesn't work. Most of the asserts were based on experience on other Shopping Cart operatons on e-commerce web sites. 
</p>

## UI Test Scenarios

1. Smoke Test - Page is reachable i.e. - Cart page title check
2. Cart page Look and feel - Default
   - Heading is "Your Shopping Cart"
   - Navigation menu items: Home, Products, Cart, and Profile
   - Main Summary section is visible
   - Checkout button is visible but disabled due to Out of Stock Item
   - 3 Items in the Cart
   - Cart Total is visible
   - (Not Automated) Validate fonts, font sizes and colors
   - (Not Automated) Validate Accessibility such as Tabs usage, combination of Tabs and mouse clicks, etc.
3. Increment item quantity
   - Try with Up arrow
   - Try with fill in the input field
   - Checkout Total goes up correctly
4. Decrement Item quantity
   - Try with Down arrow
   - Try with fill in the input field
   - Checkout Total goes down correctly
5. Discount pricing goes away after 2 minutes test
   - The Bluetooth Headphones discount price of $85.00 stays as $85.00 the entire time of timer
   - After the timer expires, the price is now $100
   - Cart Total gets updated
6. Limited availability item
   - Availability Icon warning is visible
   - Hover over the icon the Tooltip Text "Limited availability" is visible
7. Remove Item that is Out of Stock makes the Checkout button enabled
8. Remove Items functionality
   - Clicking the Remove button for an item brings up the Remove confirm modal
   - The modal has the following:
      a. Heading - Are you sure you want to remove this item?
      b. Yes Button
      c. Cancel Button
   - Click Yes
   - Item gets removed
   - Cart Total gets updated
   - Do this for all items until there is None
   - Removing all Items fromt the cart reflects a Total of $0.
9. Evaluate Menu Nav Links
   - Link for Home goes to the Home page
   - Link for Profile goes to Profile of User
   - Link for Cart goes to Cart page, remains on the same page
   - Link for Products goes to Product Catalog page
10. Clicking the Checkout button should go to the Checkout/Payment page

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

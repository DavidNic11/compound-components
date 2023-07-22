export * from "./CompoundDropdown";

/**
 * config
 * <Tabs onTabChange={handle} tabs={[{label:'', data: '...'}]} />
 *
 * code
 * <Tabs>
 *  <TabList>
 *      <TabListItem as={Link} href value />
 * *      <TabListItem as={Link} href value1 />
 * *      <TabListItem as={Link} href value2 />
 *  </TabList>
 *  <TabContent>
 *       <Content value />
 * *       <Content value1 />
 * *       <Content value2 />
 *  </TabContent>
 * </Tabs>
 *
 *
 * <Tabs onTabChange={handle}>
 *  <TabItem label>
 *      content
 *  </TabItem>
 * <TabItem label1>
 *      content
 *  </TabItem>
 * <TabItem label2>
 *      content
 *  </TabItem>
 * <Tabs>
 *
 * <Up>
 *  <Link download=''>download this</Link>
 * </Up>
 *
 * <Up>
 *  <UpLink label='download' download='' />
 * </Up>
 */

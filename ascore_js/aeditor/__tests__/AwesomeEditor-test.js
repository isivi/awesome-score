import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';
import AwesomeEditor from '../AwesomeEditor';


describe('root', () => {
  it('renders without problems', () => {
    const root = TestUtils.renderIntoDocument(<AwesomeEditor/>);
    expect(root).toExist();
  });
});

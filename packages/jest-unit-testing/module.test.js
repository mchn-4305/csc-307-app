// module.test.js

import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 5;
    const got = mut.div(30, 6);
    expect(got).toBe(expected)
});

test('Testing div -- div by zero', () => {
    const expected = "";
    const got = mut.div(30, 0);
    expect(got).toEqual(Infinity);
});

test('Testing div -- double value', () => {
    const expected = 6/5;
    const got = mut.div(6, 5);
    expect(got).toBe(expected)
});

test('Testing containsNumbers -- string with numbers', ()=> {
    const s = "ABC123";
    expect(mut.containsNumbers(s)).toBe(true);
})

test('Testing containsNumbers -- string without numbers', ()=> {
    const s = "ABC";
    expect(mut.containsNumbers(s)).toBe(false);
})

// bugged code
test('Testing containsNumbers -- string with special characters -- this is a bug', ()=> {
    const s = "`~!@#$%^&*()-_=+[]\\{}}|;':<>?,./\" ";
    expect(mut.containsNumbers(s)).toBe(false);
})
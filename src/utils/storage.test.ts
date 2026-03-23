import { describe, it, expect, beforeEach } from 'vitest';
import { loadFromStorage, saveToStorage } from './storage';

beforeEach(() => {
  localStorage.clear();
});

describe('storage utils', () => {
  it('saves and loads data', () => {
    saveToStorage('test-key', { name: 'London' });
    expect(loadFromStorage('test-key', null)).toEqual({ name: 'London' });
  });

  it('returns fallback when key does not exist', () => {
    expect(loadFromStorage('missing', 'default')).toBe('default');
  });

  it('returns fallback for invalid JSON', () => {
    localStorage.setItem('bad-json', '{invalid');
    expect(loadFromStorage('bad-json', [])).toEqual([]);
  });

  it('handles arrays', () => {
    const items = [{ id: '1', city: 'Paris' }];
    saveToStorage('arr', items);
    expect(loadFromStorage('arr', [])).toEqual(items);
  });
});

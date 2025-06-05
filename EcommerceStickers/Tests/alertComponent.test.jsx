import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { FloatingAlertProvider, useFloatingAlert } from '../src/Components/Shared/FloatingAlertContext';

// Composant test
function TestComponent({ type = 'success' }) {
  const { showAlert } = useFloatingAlert();
  return (
    <button onClick={() => showAlert('Test réussi !', type)}>
      Show Alert
    </button>
  );
}

describe('FloatingAlert', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('affiche une alerte de type success', () => {
    render(
      <FloatingAlertProvider>
        <TestComponent type="success" />
      </FloatingAlertProvider>
    );

    act(() => {
      screen.getByText('Show Alert').click();
    });

    const alert = screen.getByText('Test réussi !');
    expect(alert).toBeTruthy();
    expect(alert.className).toContain('alert-success');
  });

  it('affiche une alerte de type danger', () => {
    render(
      <FloatingAlertProvider>
        <TestComponent type="danger" />
      </FloatingAlertProvider>
    );

    act(() => {
      screen.getByText('Show Alert').click();
    });

    const alert = screen.getByText('Test réussi !');
    expect(alert).toBeTruthy();
    expect(alert.className).toContain('alert-danger');
  });

  it('disparaît après 2,5 secondes', () => {
    render(
      <FloatingAlertProvider>
        <TestComponent />
      </FloatingAlertProvider>
    );

    act(() => {
      screen.getByText('Show Alert').click();
    });

    expect(screen.getByText('Test réussi !')).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(screen.queryByText('Test réussi !')).toBeNull();
  });
});

export const overflowView = hasOverflow => {
  if (!(window && window.document)) {
    return;
  }

  const { body } = window.document;

  if (!body) {
    return;
  }

  if (hasOverflow) {
    body.classList.remove('modal-open');
    return;
  }

  body.classList.add('modal-open');
};

import { useState } from 'react';
import emailjs from 'emailjs-com';
import { useCart } from '../cartContextHelpers';
import './Checkout.scss';

export const Modal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { clearCart } = useCart();

  // Функція валідації форми
  const validateForm = formData => {
    const newErrors = {};

    // Name: тільки букви, мінімум 2 символи
    if (!/^[A-Za-zА-Яа-яЇїІіЄєҐґ\s]{2,}$/.test(formData.name)) {
      newErrors.name = 'Please enter a valid name (at least 2 letters).';
    }

    // Phone: формат +380XXXXXXXXX
    if (!/^\+380\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be in format +380XXXXXXXXX.';
    }

    // Email: базова перевірка
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    return newErrors;
  };

  // Відправка форми
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
    };

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);

      return;
    }

    setErrors({});

    emailjs
      .sendForm(
        'service_eiwmcj4', // service ID
        'template_zxtrego', // template ID
        form,
        'vKJ2wUBIpa1CTkVZt', // ser ID (public key)
      )
      .then(
        () => {
          alert('Order submitted!');

          // ✅ очищаємо корзину після успішного замовлення
          clearCart();

          setLoading(false);
          onClose(); // закриваємо модалку
        },
        () => {
          alert('Failed to send email. Try again.');
          setLoading(false);
        },
      );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Order Confirmation</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Name:
            <input type="text" name="name" placeholder="Mykhailo" required />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>

          <label>
            Phone number:
            <input
              type="tel"
              name="phone"
              placeholder="+380XXXXXXXXX"
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </label>

          <label>
            Email address:
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>

          <div className="button-submit">
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

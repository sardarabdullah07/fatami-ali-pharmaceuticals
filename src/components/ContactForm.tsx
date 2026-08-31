import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ArrowRight, CheckCircle2, Info, Mail } from 'lucide-react'
import { contact, inquiryTypes } from '@/data/company'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * There is no mail server behind this site, and the form does not pretend
 * otherwise. On a valid submission it composes the message and hands it to the
 * visitor's own email client, addressed to both company addresses — so the
 * inquiry actually arrives, and nobody is told "sent" when nothing was.
 *
 * The shape is deliberately API-ready: `Values` is the payload, `validate` is
 * pure, and `submit` is the single place to swap the mailto for a POST.
 */

type Values = {
  name: string
  organization: string
  email: string
  phone: string
  inquiryType: string
  subject: string
  message: string
}

type Errors = Partial<Record<keyof Values, string>>

const empty: Values = {
  name: '',
  organization: '',
  email: '',
  phone: '',
  inquiryType: '',
  subject: '',
  message: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+()\d][\d\s()+.-]{5,}$/

export function validate(values: Values): Errors {
  const errors: Errors = {}

  if (!values.name.trim()) errors.name = 'Enter your full name.'
  else if (values.name.trim().length < 2) errors.name = 'Enter at least two characters.'

  if (!values.organization.trim())
    errors.organization = 'Tell us which company or organisation you represent.'

  if (!values.email.trim()) errors.email = 'Enter an email address we can reply to.'
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = 'Enter a valid email address, for example name@company.com.'

  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim()))
    errors.phone = 'Use digits, spaces and + ( ) - only.'

  if (!values.inquiryType) errors.inquiryType = 'Choose the type of inquiry.'

  if (!values.subject.trim()) errors.subject = 'Add a subject line.'
  else if (values.subject.trim().length < 4) errors.subject = 'Add a few more characters.'

  if (!values.message.trim()) errors.message = 'Add a short message so we can route your inquiry.'
  else if (values.message.trim().length < 20)
    errors.message = 'Add a little more detail — at least 20 characters.'

  return errors
}

/** The single integration point. Replace the body with a POST when a backend exists. */
function submit(values: Values): { mailto: string } {
  const body = [
    `Name: ${values.name}`,
    `Company / organisation: ${values.organization}`,
    `Email: ${values.email}`,
    values.phone.trim() ? `Phone: ${values.phone}` : null,
    `Inquiry type: ${values.inquiryType}`,
    '',
    values.message,
  ]
    .filter(Boolean)
    .join('\n')

  const mailto =
    `mailto:${contact.emails[0]}` +
    `?cc=${encodeURIComponent(contact.emails[1])}` +
    `&subject=${encodeURIComponent(values.subject)}` +
    `&body=${encodeURIComponent(body)}`

  return { mailto }
}

/* ------------------------------------------------------------------ field */

function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-label uppercase text-fg">
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-[0.75rem] font-normal normal-case tracking-normal text-fg-subtle">
            optional
          </span>
        )}
      </label>
      <div className="mt-2.5">{children}</div>
      {hint && !error ? <p className="mt-2 text-[0.8125rem] text-fg-subtle">{hint}</p> : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-[0.8125rem] font-medium text-danger"
        >
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

const inputClass = (invalid: boolean) =>
  cn(
    'w-full rounded-card border bg-surface px-4 py-3.5 text-[0.9375rem] text-fg placeholder:text-fg-subtle transition-colors duration-300 min-h-[52px]',
    invalid
      ? 'border-danger focus:border-danger'
      : 'border-line hover:border-line-strong focus:border-accent',
  )

/* ------------------------------------------------------------------- form */

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [done, setDone] = useState<null | { mailto: string }>(null)
  const reduced = usePrefersReducedMotion()
  const formRef = useRef<HTMLFormElement>(null)

  const update = (key: keyof Values) => (value: string) => {
    const next = { ...values, [key]: value }
    setValues(next)
    // Only re-validate live once the visitor has tried to send, so the form
    // does not start correcting them while they are still typing the first field.
    if (attempted) setErrors(validate(next))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0]
      formRef.current?.querySelector<HTMLElement>(`#field-${firstKey}`)?.focus()
      return
    }

    setDone(submit(values))
  }

  const reset = () => {
    setValues(empty)
    setErrors({})
    setAttempted(false)
    setDone(null)
  }

  return (
    <div className="rounded-panel border border-line bg-surface p-7 shadow-card sm:p-10">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            aria-live="polite"
            className="py-4 text-center"
          >
            <CheckCircle2
              className="mx-auto h-11 w-11 text-accent"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <h3 className="mt-6 text-display-sm text-fg">Your inquiry is ready to send</h3>
            <p className="mx-auto mt-4 max-w-md text-pretty text-body-sm leading-relaxed text-fg-muted">
              Nothing has left your browser yet. The button below opens the message in your own
              email app, already addressed to both of our inboxes and filled in — review it and
              press send.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={done.mailto}
                className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-action px-6 py-3 text-[0.9375rem] font-semibold text-on-action transition-colors duration-300 hover:bg-action-hover"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Open in your email app
              </a>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-[52px] cursor-pointer items-center rounded-full border border-line-strong px-6 text-[0.9375rem] font-semibold text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Write another
              </button>
            </div>

            <p className="mt-8 border-t border-line pt-6 text-[0.8125rem] text-fg-subtle">
              Prefer to write directly? {contact.emails[0]} · {contact.emails[1]}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="field-name" label="Full name" required error={errors.name}>
                <input
                  id="field-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update('name')(e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'field-name-error' : undefined}
                  className={inputClass(Boolean(errors.name))}
                  placeholder="Your name"
                />
              </Field>

              <Field
                id="field-organization"
                label="Company / organisation"
                required
                error={errors.organization}
              >
                <input
                  id="field-organization"
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  value={values.organization}
                  onChange={(e) => update('organization')(e.target.value)}
                  aria-invalid={Boolean(errors.organization)}
                  aria-describedby={errors.organization ? 'field-organization-error' : undefined}
                  className={inputClass(Boolean(errors.organization))}
                  placeholder="Manufacturer, hospital or institution"
                />
              </Field>

              <Field id="field-email" label="Email address" required error={errors.email}>
                <input
                  id="field-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update('email')(e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'field-email-error' : undefined}
                  className={inputClass(Boolean(errors.email))}
                  placeholder="name@company.com"
                />
              </Field>

              <Field id="field-phone" label="Phone number" error={errors.phone}>
                <input
                  id="field-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => update('phone')(e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'field-phone-error' : undefined}
                  className={inputClass(Boolean(errors.phone))}
                  placeholder="+00 000 000 0000"
                />
              </Field>

              <Field id="field-inquiryType" label="Inquiry type" required error={errors.inquiryType}>
                <select
                  id="field-inquiryType"
                  name="inquiryType"
                  value={values.inquiryType}
                  onChange={(e) => update('inquiryType')(e.target.value)}
                  aria-invalid={Boolean(errors.inquiryType)}
                  aria-describedby={errors.inquiryType ? 'field-inquiryType-error' : undefined}
                  className={cn(
                    inputClass(Boolean(errors.inquiryType)),
                    'cursor-pointer appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10',
                    !values.inquiryType && 'text-fg-subtle',
                  )}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230F8578' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                  }}
                >
                  <option value="" disabled>
                    Select an inquiry type
                  </option>
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="field-subject" label="Subject" required error={errors.subject}>
                <input
                  id="field-subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={(e) => update('subject')(e.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'field-subject-error' : undefined}
                  className={inputClass(Boolean(errors.subject))}
                  placeholder="What your message is about"
                />
              </Field>
            </div>

            <Field
              id="field-message"
              label="Message"
              required
              error={errors.message}
              hint="Tell us about the products, therapeutic areas or territories you have in mind."
            >
              <textarea
                id="field-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(e) => update('message')(e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'field-message-error' : undefined}
                className={cn(inputClass(Boolean(errors.message)), 'resize-y leading-relaxed')}
                placeholder="A short description of what you are looking for"
              />
            </Field>

            {attempted && Object.keys(errors).length > 0 ? (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-card border border-danger/40 bg-danger-soft px-4 py-3 text-body-sm font-medium text-danger"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Check the highlighted fields and try again.
              </p>
            ) : null}

            <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2 text-[0.8125rem] leading-relaxed text-fg-subtle">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                No mail server is connected to this form — it prepares your message for your own
                email app.
              </p>
              <button
                type="submit"
                className="group inline-flex min-h-[52px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-7 py-3 text-[0.9375rem] font-semibold text-on-action transition-all duration-300 hover:bg-action-hover hover:shadow-action active:translate-y-px"
              >
                Send Inquiry
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

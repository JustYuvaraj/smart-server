# Validation

- TypeScript strict check: passed.
- Production build: passed before final source packaging; rebuilt during publication.
- Domain tests: 12 passed, covering scope locking, amounts, authorization, QR expiry/tampering/replay, location rejection, charge approval, completion and API redaction.
- Local API integration: passed against D1 and R2, including the full booking flow and ₹850 invoice, photo upload/read, persisted completion, unauthorized rejection and same-origin enforcement.
- Browser QA: interactive phone preview at 390 px; quote acceptance, worker/customer switching, QR generation and customer verification completed. Booking detail at 320 px had no horizontal overflow.
- Physical-device camera/GPS testing is not claimed.

import { StyleSheet } from '@react-pdf/renderer';
import { COLORS } from '@/constants/colors';

const BADGE_PAID_BACKGROUND = '#dcfce7';
const BADGE_PENDING_BACKGROUND = '#fef9c3';
const BADGE_FAILED_BACKGROUND = '#fee2e2';
const BADGE_PENDING_TEXT_COLOR = '#ca8a04';

export const invoiceStyles = StyleSheet.create({
  page: {
    fontFamily: 'Manrope',
    fontWeight: 400,
    fontSize: 10,
    color: COLORS.primary,
    padding: '48 48 64 48',
    backgroundColor: COLORS.white,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    paddingBottom: 24,
    borderBottom: `1 solid ${COLORS.elements}`,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: -0.5,
    color: COLORS.primary,
  },
  invoiceLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.secondary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  invoiceId: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.primary,
  },

  metaRow: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: `1 solid ${COLORS.elements}`,
  },
  metaColumn: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1.5,
    color: COLORS.secondary,
    marginBottom: 5,
  },
  metaValue: {
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.primary,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgePaid: { backgroundColor: BADGE_PAID_BACKGROUND },
  badgePending: { backgroundColor: BADGE_PENDING_BACKGROUND },
  badgeFailed: { backgroundColor: BADGE_FAILED_BACKGROUND },
  badgeCancelled: { backgroundColor: COLORS.hoverAndBg },
  badgeText: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  badgeTextPaid: { color: COLORS.green },
  badgeTextPending: { color: BADGE_PENDING_TEXT_COLOR },
  badgeTextFailed: { color: COLORS.red },
  badgeTextCancelled: { color: COLORS.secondary },

  addressesRow: {
    flexDirection: 'row',
    marginBottom: 36,
  },
  addressColumnLeft: {
    flex: 1,
    paddingRight: 24,
  },
  addressColumnRight: {
    flex: 1,
    paddingLeft: 24,
  },
  addressName: {
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 4,
  },
  addressDetail: {
    fontSize: 10,
    fontWeight: 400,
    color: COLORS.secondary,
    marginBottom: 2,
  },
  addressDetailLast: {
    fontSize: 10,
    fontWeight: 400,
    color: COLORS.secondary,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: COLORS.elements,
    marginHorizontal: 8,
  },

  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.hoverAndBg,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottom: `1 solid ${COLORS.elements}`,
    alignItems: 'center',
  },
  columnImage: { width: 36, marginRight: 10 },
  columnItem: { flex: 1 },
  columnQuantity: { width: 60, textAlign: 'center' },
  columnPrice: { width: 60, textAlign: 'right' },
  columnTotal: { width: 60, textAlign: 'right' },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1,
    color: COLORS.secondary,
  },
  bookImage: {
    width: 36,
    height: 48,
    objectFit: 'cover',
    borderRadius: 2,
  },
  cellTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 2,
  },
  cellAuthor: {
    fontSize: 8,
    fontWeight: 400,
    color: COLORS.secondary,
  },
  cellText: {
    fontSize: 10,
    fontWeight: 400,
    color: COLORS.secondary,
  },
  cellTextBold: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.primary,
  },

  totalsSection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalDivider: {
    height: 1,
    backgroundColor: COLORS.elements,
    width: 200,
    marginVertical: 8,
  },
  totalLabel: { fontSize: 10, fontWeight: 400, color: COLORS.secondary },
  totalValue: { fontSize: 10, fontWeight: 400, color: COLORS.secondary },
  grandLabel: { fontSize: 12, fontWeight: 700, color: COLORS.primary },
  grandValue: { fontSize: 14, fontWeight: 800, color: COLORS.primary },

  footer: {
    position: 'absolute',
    bottom: 32,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `1 solid ${COLORS.elements}`,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    fontWeight: 400,
    color: COLORS.icons,
  },
});

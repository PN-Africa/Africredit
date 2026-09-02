import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Landmark,
  FileText,
  ClipboardCheck,
  ArrowDownToLine,
  CheckCircle2,
  XCircle,
} from "lucide-react-native";
import { useLoan, ActivityIcon, ActivityItem } from "../../contexts/LoanContext";
import { formatCurrency, formatTime } from "../../lib/loanMath";

function Icon({ type }: { type: ActivityIcon }) {
  const size = 16;
  const color = type === "terminated" ? "#E7514F" : "#22A67A";
  switch (type) {
    case "bank":
      return <Landmark size={size} color={color} />;
    case "bill":
      return <FileText size={size} color={color} />;
    case "review":
      return <ClipboardCheck size={size} color={color} />;
    case "disburse":
      return <ArrowDownToLine size={size} color={color} />;
    case "terminated":
      return <XCircle size={size} color={color} />;
    default:
      return <CheckCircle2 size={size} color={color} />;
  }
}

function groupLabel(date: Date) {
  const now = new Date();
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Activity() {
  const { activityLog } = useLoan();

  const grouped = activityLog.reduce<Record<string, ActivityItem[]>>(
    (acc, item) => {
      const label = groupLabel(item.timestamp);
      if (!acc[label]) acc[label] = [];
      acc[label].push(item);
      return acc;
    },
    {}
  );

  const sectionOrder = Object.keys(grouped);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Activity</Text>

      {sectionOrder.length === 0 && (
        <Text style={styles.emptyText}>
          No activity yet. Actions like connecting your bank, applying for a
          loan, and repayments will show up here.
        </Text>
      )}

      {sectionOrder.map((section) => (
        <View key={section} style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>{section}</Text>
          <View style={styles.card}>
            {grouped[section].map((item, i) => (
              <View
                key={item.id}
                style={[
                  styles.row,
                  i === grouped[section].length - 1 && {
                    borderBottomWidth: 0,
                  },
                ]}
              >
                <View
                  style={[
                    styles.rowIcon,
                    item.icon === "terminated" && {
                      backgroundColor: "#FDECEC",
                    },
                  ]}
                >
                  <Icon type={item.icon} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowSubtitle}>
                    {item.subtitle} - {formatTime(item.timestamp)}
                  </Text>
                </View>
                {item.amount !== undefined && (
                  <Text style={styles.rowAmount}>
                    {formatCurrency(item.amount)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },
  emptyText: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 24,
    lineHeight: 19,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#9ca3af",
    fontWeight: "600",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EAE0",
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#E3F5EC",
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    flex: 1,
    marginLeft: 12,
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  rowSubtitle: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  rowAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
});
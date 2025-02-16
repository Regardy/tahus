const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Fetch latest 10 donations from database
const getDonations = async () => {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(10);
  return error ? [] : data; // Return empty array if error occurs
};

// Save a new donation entry in the database
const saveDonation = async (donation) => {
  await supabase.from("donations").insert([donation]);
};

module.exports = { getDonations, saveDonation };

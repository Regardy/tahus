const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const getDonations = async () => {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(10);
  return error ? [] : data;
};

const saveDonation = async (donation) => {
  await supabase.from("donations").insert([donation]);
};

module.exports = { getDonations, saveDonation };

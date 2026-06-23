function filterNumbers(objects, nums) {
  const filter = objects.find(item => typeof item === 'function');

  return nums.filter(filter);
}

import CodingProblem from "./models/CodingProblem.js";
import Question from "./models/Question.js";

export const CODING_PROBLEMS = [
  // EASY PROBLEMS (c1 - c4, c9 - c12)
  {
    customId: "c1",
    title: "Two Sum",
    difficulty: "Easy",
    prompt: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
    starter: "function twoSum(nums, target) {\n  // your code here\n}",
    starters: {
      javascript: "function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (diff in map) return [map[diff], i];\n    map[nums[i]] = i;\n  }\n  return [];\n}",
      python: "def two_sum(nums, target):\n    hashmap = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in hashmap:\n            return [hashmap[diff], i]\n        hashmap[n] = i\n    return []",
      java: "public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[] { map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}",
      cpp: "#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (map.count(diff)) return {map[diff], i};\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};"
    },
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" }
    ]
  },
  {
    customId: "c2",
    title: "Reverse a String",
    difficulty: "Easy",
    prompt: "Write a function that reverses a string in place without using the built-in reverse method.\n\nExample:\nInput: s = \"hello\"\nOutput: \"olleh\"",
    starter: "function reverseString(str) {\n  // your code here\n}",
    starters: {
      javascript: "function reverseString(str) {\n  let result = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    result += str[i];\n  }\n  return result;\n}",
      python: "def reverse_string(s):\n    return s[::-1]",
      java: "public class Solution {\n    public String reverseString(String s) {\n        return new StringBuilder(s).reverse().toString();\n    }\n}",
      cpp: "#include <string>\n#include <algorithm>\n\nclass Solution {\npublic:\n    std::string reverseString(std::string s) {\n        std::reverse(s.begin(), s.end());\n        return s;\n    }\n};"
    },
    testCases: [
      { input: '"hello"', expectedOutput: '"olleh"' },
      { input: '"Prepline"', expectedOutput: '"enilperP"' }
    ]
  },
  {
    customId: "c3",
    title: "Palindrome Number",
    difficulty: "Easy",
    prompt: "Given an integer `x`, return true if `x` is a palindrome, and false otherwise.\n\nExample:\nInput: x = 121\nOutput: true",
    starter: "function isPalindromeNumber(x) {\n  // your code here\n}",
    starters: {
      javascript: "function isPalindromeNumber(x) {\n  if (x < 0) return false;\n  const str = String(x);\n  return str === str.split('').reverse().join('');\n}",
      python: "def is_palindrome_number(x):\n    if x < 0:\n        return False\n    return str(x) == str(x)[::-1]",
      java: "public class Solution {\n    public boolean isPalindrome(int x) {\n        if (x < 0) return false;\n        String s = String.valueOf(x);\n        return new StringBuilder(s).reverse().toString().equals(s);\n    }\n}",
      cpp: "class Solution {\npublic:\n    bool isPalindrome(int x) {\n        if (x < 0) return false;\n        std::string s = std::to_string(x);\n        std::string rev = s;\n        std::reverse(rev.begin(), rev.end());\n        return s == rev;\n    }\n};"
    },
    testCases: [
      { input: "121", expectedOutput: "true" },
      { input: "-121", expectedOutput: "false" }
    ]
  },
  {
    customId: "c9",
    title: "FizzBuzz",
    difficulty: "Easy",
    prompt: "Given an integer `n`, return a string array answer (1-indexed) where:\n- answer[i] == \"FizzBuzz\" if i is divisible by 3 and 5.\n- answer[i] == \"Fizz\" if i is divisible by 3.\n- answer[i] == \"Buzz\" if i is divisible by 5.\n- answer[i] == i (as a string) if none of the above conditions are true.",
    starter: "function fizzBuzz(n) {\n  // your code here\n}",
    starters: {
      javascript: "function fizzBuzz(n) {\n  const res = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) res.push('FizzBuzz');\n    else if (i % 3 === 0) res.push('Fizz');\n    else if (i % 5 === 0) res.push('Buzz');\n    else res.push(String(i));\n  }\n  return res;\n}",
      python: "def fizz_buzz(n):\n    res = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            res.append('FizzBuzz')\n        elif i % 3 == 0:\n            res.append('Fizz')\n        elif i % 5 == 0:\n            res.append('Buzz')\n        else:\n            res.append(str(i))\n    return res",
      java: "public class Solution {\n    public List<String> fizzBuzz(int n) {\n        List<String> res = new ArrayList<>();\n        for (int i = 1; i <= n; i++) {\n            if (i % 15 == 0) res.add(\"FizzBuzz\");\n            else if (i % 3 == 0) res.add(\"Fizz\");\n            else if (i % 5 == 0) res.add(\"Buzz\");\n            else res.add(String.valueOf(i));\n        }\n        return res;\n    }\n}",
      cpp: "class Solution {\npublic:\n    std::vector<std::string> fizzBuzz(int n) {\n        std::vector<std::string> res;\n        for (int i = 1; i <= n; i++) {\n            if (i % 15 == 0) res.push_back(\"FizzBuzz\");\n            else if (i % 3 == 0) res.push_back(\"Fizz\");\n            else if (i % 5 == 0) res.push_back(\"Buzz\");\n            else res.push_back(std::to_string(i));\n        }\n        return res;\n    }\n};"
    },
    testCases: [
      { input: "5", expectedOutput: '["1","2","Fizz","4","Buzz"]' },
      { input: "3", expectedOutput: '["1","2","Fizz"]' }
    ]
  },
  {
    customId: "c10",
    title: "Valid Anagram",
    difficulty: "Easy",
    prompt: "Given two strings `s` and `t`, return true if `t` is an anagram of `s`, and false otherwise.",
    starter: "function isAnagram(s, t) {\n  // your code here\n}",
    starters: {
      javascript: "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  return s.split('').sort().join('') === t.split('').sort().join('');\n}",
      python: "def is_anagram(s, t):\n    return sorted(s) == sorted(t)",
      java: "public class Solution {\n    public boolean isAnagram(String s, String t) {\n        char[] sArr = s.toCharArray(), tArr = t.toCharArray();\n        Arrays.sort(sArr);\n        Arrays.sort(tArr);\n        return Arrays.equals(sArr, tArr);\n    }\n}",
      cpp: "class Solution {\npublic:\n    bool isAnagram(std::string s, std::string t) {\n        std::sort(s.begin(), s.end());\n        std::sort(t.begin(), t.end());\n        return s == t;\n    }\n};"
    },
    testCases: [
      { input: '"anagram", "nagaram"', expectedOutput: "true" },
      { input: '"rat", "car"', expectedOutput: "false" }
    ]
  },
  {
    customId: "c11",
    title: "Contains Duplicate",
    difficulty: "Easy",
    prompt: "Given an integer array `nums`, return true if any value appears at least twice in the array, and false if every element is distinct.",
    starter: "function containsDuplicate(nums) {\n  // your code here\n}",
    starters: {
      javascript: "function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}",
      python: "def contains_duplicate(nums):\n    return len(set(nums)) != len(nums)",
      java: "public class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) if (!set.add(n)) return true;\n        return false;\n    }\n}",
      cpp: "class Solution {\npublic:\n    bool containsDuplicate(std::vector<int>& nums) {\n        std::unordered_set<int> set(nums.begin(), nums.end());\n        return set.size() != nums.size();\n    }\n};"
    },
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "true" },
      { input: "[1,2,3,4]", expectedOutput: "false" }
    ]
  },
  {
    customId: "c12",
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Easy",
    prompt: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    starter: "function maxSubArray(nums) {\n  // your code here\n}",
    starters: {
      javascript: "function maxSubArray(nums) {\n  let maxSoFar = nums[0], maxEndingHere = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);\n    maxSoFar = Math.max(maxSoFar, maxEndingHere);\n  }\n  return maxSoFar;\n}",
      python: "def max_sub_array(nums):\n    max_so_far = max_ending = nums[0]\n    for n in nums[1:]:\n        max_ending = max(n, max_ending + n)\n        max_so_far = max(max_so_far, max_ending)\n    return max_so_far",
      java: "public class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSoFar = nums[0], maxEnding = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            maxEnding = Math.max(nums[i], maxEnding + nums[i]);\n            maxSoFar = Math.max(maxSoFar, maxEnding);\n        }\n        return maxSoFar;\n    }\n}",
      cpp: "class Solution {\npublic:\n    int maxSubArray(std::vector<int>& nums) {\n        int maxSoFar = nums[0], maxEnding = nums[0];\n        for (size_t i = 1; i < nums.size(); i++) {\n            maxEnding = std::max(nums[i], maxEnding + nums[i]);\n            maxSoFar = std::max(maxSoFar, maxEnding);\n        }\n        return maxSoFar;\n    }\n};"
    },
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" }
    ]
  },

  // MEDIUM PROBLEMS (c4 - c6, c13 - c16)
  {
    customId: "c4",
    title: "Valid Palindrome",
    difficulty: "Medium",
    prompt: "Given a string `s`, determine if it is a palindrome, considering only alphanumeric characters and ignoring case.\n\nExample:\nInput: s = \"A man, a plan, a canal: Panama\"\nOutput: true",
    starter: "function isPalindrome(s) {\n  // your code here\n}",
    starters: {
      javascript: "function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}",
      python: "def is_palindrome(s):\n    clean = [c.lower() for c in s if c.isalnum()]\n    return clean == clean[::-1]",
      java: "public class Solution {\n    public boolean isPalindrome(String s) {\n        String clean = s.replaceAll(\"[^a-zA-Z0-9]\", \"\").toLowerCase();\n        return new StringBuilder(clean).reverse().toString().equals(clean);\n    }\n}",
      cpp: "class Solution {\npublic:\n    bool isPalindrome(std::string s) {\n        std::string clean = \"\";\n        for (char c : s) if (std::isalnum(c)) clean += std::tolower(c);\n        std::string rev = clean;\n        std::reverse(rev.begin(), rev.end());\n        return clean == rev;\n    }\n};"
    },
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: "true" },
      { input: '"race a car"', expectedOutput: "false" }
    ]
  },
  {
    customId: "c5",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    prompt: "Given a string `s`, find the length of the longest substring without repeating characters.\n\nExample:\nInput: s = \"abcabcbb\"\nOutput: 3",
    starter: "function lengthOfLongestSubstring(s) {\n  // your code here\n}",
    starters: {
      javascript: "function lengthOfLongestSubstring(s) {\n  let set = new Set();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) set.delete(s[left++]);\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}",
      python: "def length_of_longest_substring(s):\n    char_set, left, max_len = set(), 0, 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        max_len = max(max_len, right - left + 1)\n    return max_len",
      java: "public class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> set = new HashSet<>();\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); right++) {\n            while (set.contains(s.charAt(right))) set.remove(s.charAt(left++));\n            set.add(s.charAt(right));\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}",
      cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(std::string s) {\n        std::unordered_set<char> set;\n        int left = 0, maxLen = 0;\n        for (size_t right = 0; right < s.length(); right++) {\n            while (set.count(s[right])) set.erase(s[left++]);\n            set.insert(s[right]);\n            maxLen = std::max(maxLen, (int)(right - left + 1));\n        }\n        return maxLen;\n    }\n};"
    },
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3" },
      { input: '"bbbbb"', expectedOutput: "1" }
    ]
  },
  {
    customId: "c6",
    title: "Container With Most Water",
    difficulty: "Medium",
    prompt: "Given `n` non-negative integers representing vertical lines, find two lines that together with the x-axis form a container containing the most water.\n\nExample:\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49",
    starter: "function maxArea(height) {\n  // your code here\n}",
    starters: {
      javascript: "function maxArea(height) {\n  let left = 0, right = height.length - 1, maxWater = 0;\n  while (left < right) {\n    const h = Math.min(height[left], height[right]);\n    maxWater = Math.max(maxWater, h * (right - left));\n    if (height[left] < height[right]) left++; else right--;\n  }\n  return maxWater;\n}",
      python: "def max_area(height):\n    left, right, max_water = 0, len(height) - 1, 0\n    while left < right:\n        h = min(height[left], height[right])\n        max_water = max(max_water, h * (right - left))\n        if height[left] < height[right]: left += 1\n        else: right -= 1\n    return max_water",
      java: "public class Solution {\n    public int maxArea(int[] height) {\n        int left = 0, right = height.length - 1, maxWater = 0;\n        while (left < right) {\n            int h = Math.min(height[left], height[right]);\n            maxWater = Math.max(maxWater, h * (right - left));\n            if (height[left] < height[right]) left++; else right--;\n        }\n        return maxWater;\n    }\n}",
      cpp: "class Solution {\npublic:\n    int maxArea(std::vector<int>& height) {\n        int left = 0, right = height.size() - 1, maxWater = 0;\n        while (left < right) {\n            int h = std::min(height[left], height[right]);\n            maxWater = std::max(maxWater, h * (right - left));\n            if (height[left] < height[right]) left++; else right--;\n        }\n        return maxWater;\n    }\n};"
    },
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" }
    ]
  },
  {
    customId: "c13",
    title: "Group Anagrams",
    difficulty: "Medium",
    prompt: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
    starter: "function groupAnagrams(strs) {\n  // your code here\n}",
    starters: {
      javascript: "function groupAnagrams(strs) {\n  const map = {};\n  for (const s of strs) {\n    const sorted = s.split('').sort().join('');\n    if (!map[sorted]) map[sorted] = [];\n    map[sorted].push(s);\n  }\n  return Object.values(map);\n}",
      python: "def group_anagrams(strs):\n    d = {}\n    for s in strs:\n        key = ''.join(sorted(s))\n        d.setdefault(key, []).append(s)\n    return list(d.values())",
      java: "public class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] ca = s.toCharArray(); Arrays.sort(ca);\n            String key = String.valueOf(ca);\n            if (!map.containsKey(key)) map.put(key, new ArrayList<>());\n            map.get(key).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n}",
      cpp: "class Solution {\npublic:\n    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {\n        std::unordered_map<std::string, std::vector<std::string>> map;\n        for (auto& s : strs) {\n            std::string key = s;\n            std::sort(key.begin(), key.end());\n            map[key].push_back(s);\n        }\n        std::vector<std::vector<std::string>> res;\n        for (auto& p : map) res.push_back(p.second);\n        return res;\n    }\n};"
    },
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]' }
    ]
  },
  {
    customId: "c14",
    title: "3Sum",
    difficulty: "Medium",
    prompt: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `nums[i] + nums[j] + nums[k] == 0`.",
    starter: "function threeSum(nums) {\n  // your code here\n}",
    starters: {
      javascript: "function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++; r--;\n      } else if (sum < 0) l++; else r--;\n    }\n  }\n  return res;\n}",
      python: "def three_sum(nums):\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i-1]: continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l+1]: l += 1\n                while l < r and nums[r] == nums[r-1]: r -= 1\n                l += 1; r -= 1\n            elif s < 0: l += 1\n            else: r -= 1\n    return res",
      java: "public class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums); List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i-1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l+1]) l++;\n                    while (l < r && nums[r] == nums[r-1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++; else r--;\n            }\n        }\n        return res;\n    }\n}",
      cpp: "class Solution {\npublic:\n    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {\n        std::sort(nums.begin(), nums.end()); std::vector<std::vector<int>> res;\n        for (size_t i = 0; i < nums.size(); i++) {\n            if (i > 0 && nums[i] == nums[i-1]) continue;\n            int l = i + 1, r = nums.size() - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.push_back({nums[i], nums[l], nums[r]});\n                    while (l < r && nums[l] == nums[l+1]) l++;\n                    while (l < r && nums[r] == nums[r-1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++; else r--;\n            }\n        }\n        return res;\n    }\n};"
    },
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" }
    ]
  },
  {
    customId: "c15",
    title: "Coin Change",
    difficulty: "Medium",
    prompt: "You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount.",
    starter: "function coinChange(coins, amount) {\n  // your code here\n}",
    starters: {
      javascript: "function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const c of coins) {\n      if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}",
      python: "def coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if i - c >= 0: dp[i] = min(dp[i], dp[i - c] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1",
      java: "public class Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1]; Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}",
      cpp: "class Solution {\npublic:\n    int coinChange(std::vector<int>& coins, int amount) {\n        std::vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) if (i - c >= 0) dp[i] = std::min(dp[i], dp[i - c] + 1);\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};"
    },
    testCases: [
      { input: "[1,2,5], 11", expectedOutput: "3" },
      { input: "[2], 3", expectedOutput: "-1" }
    ]
  },
  {
    customId: "c16",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    prompt: "Given the array `nums` after possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.",
    starter: "function searchRotated(nums, target) {\n  // your code here\n}",
    starters: {
      javascript: "function searchRotated(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}",
      python: "def search_rotated(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1",
      java: "public class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = (l + r) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n}",
      cpp: "class Solution {\npublic:\n    int search(std::vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int mid = (l + r) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n};"
    },
    testCases: [
      { input: "[4,5,6,7,0,1,2], 0", expectedOutput: "4" },
      { input: "[4,5,6,7,0,1,2], 3", expectedOutput: "-1" }
    ]
  },

  // HARD PROBLEMS (c7, c8, c17 - c19)
  {
    customId: "c7",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    prompt: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nExample:\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
    starter: "function trap(height) {\n  // your code here\n}",
    starters: {
      javascript: "function trap(height) {\n  let left = 0, right = height.length - 1, maxLeft = 0, maxRight = 0, trapped = 0;\n  while (left < right) {\n    if (height[left] <= height[right]) {\n      if (height[left] >= maxLeft) maxLeft = height[left];\n      else trapped += maxLeft - height[left];\n      left++;\n    } else {\n      if (height[right] >= maxRight) maxRight = height[right];\n      else trapped += maxRight - height[right];\n      right--;\n    }\n  }\n  return trapped;\n}",
      python: "def trap(height):\n    left, right, max_left, max_right, trapped = 0, len(height) - 1, 0, 0, 0\n    while left < right:\n        if height[left] <= height[right]:\n            if height[left] >= max_left: max_left = height[left]\n            else: trapped += max_left - height[left]\n            left += 1\n        else:\n            if height[right] >= max_right: max_right = height[right]\n            else: trapped += max_right - height[right]\n            right -= 1\n    return trapped",
      java: "public class Solution {\n    public int trap(int[] height) {\n        int left = 0, right = height.length - 1, maxLeft = 0, maxRight = 0, trapped = 0;\n        while (left < right) {\n            if (height[left] <= height[right]) {\n                if (height[left] >= maxLeft) maxLeft = height[left];\n                else trapped += maxLeft - height[left];\n                left++;\n            } else {\n                if (height[right] >= maxRight) maxRight = height[right];\n                else trapped += maxRight - height[right];\n                right--;\n            }\n        }\n        return trapped;\n    }\n}",
      cpp: "class Solution {\npublic:\n    int trap(std::vector<int>& height) {\n        int left = 0, right = height.size() - 1, maxLeft = 0, maxRight = 0, trapped = 0;\n        while (left < right) {\n            if (height[left] <= height[right]) {\n                if (height[left] >= maxLeft) maxLeft = height[left];\n                else trapped += maxLeft - height[left];\n                left++;\n            } else {\n                if (height[right] >= maxRight) maxRight = height[right];\n                else trapped += maxRight - height[right];\n                right--;\n            }\n        }\n        return trapped;\n    }\n};"
    },
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" }
    ]
  },
  {
    customId: "c8",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    prompt: "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.",
    starter: "function findMedianSortedArrays(nums1, nums2) {\n  // your code here\n}",
    starters: {
      javascript: "function findMedianSortedArrays(nums1, nums2) {\n  const merged = [...nums1, ...nums2].sort((a, b) => a - b);\n  const len = merged.length;\n  if (len % 2 !== 0) return merged[Math.floor(len / 2)];\n  return (merged[len / 2 - 1] + merged[len / 2]) / 2;\n}",
      python: "def find_median_sorted_arrays(nums1, nums2):\n    merged = sorted(nums1 + nums2)\n    length = len(merged)\n    if length % 2 != 0: return float(merged[length // 2])\n    return (merged[length // 2 - 1] + merged[length // 2]) / 2.0",
      java: "public class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        int[] merged = new int[nums1.length + nums2.length];\n        System.arraycopy(nums1, 0, merged, 0, nums1.length);\n        System.arraycopy(nums2, 0, merged, nums1.length, nums2.length);\n        Arrays.sort(merged);\n        int len = merged.length;\n        if (len % 2 != 0) return merged[len / 2];\n        return (merged[len / 2 - 1] + merged[len / 2]) / 2.0;\n    }\n}",
      cpp: "class Solution {\npublic:\n    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {\n        std::vector<int> merged = nums1;\n        merged.insert(merged.end(), nums2.begin(), nums2.end());\n        std::sort(merged.begin(), merged.end());\n        int len = merged.size();\n        if (len % 2 != 0) return merged[len / 2];\n        return (merged[len / 2 - 1] + merged[len / 2]) / 2.0;\n    }\n};"
    },
    testCases: [
      { input: "[1,3], [2]", expectedOutput: "2" }
    ]
  },
  {
    customId: "c17",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    prompt: "You are given an array of `k` sorted lists. Merge all the lists into one sorted list and return it.",
    starter: "function mergeKLists(lists) {\n  // your code here\n}",
    starters: {
      javascript: "function mergeKLists(lists) {\n  const flat = lists.flat().sort((a, b) => a - b);\n  return flat;\n}",
      python: "def merge_k_lists(lists):\n    import heapq\n    flat = [val for sublist in lists for val in sublist]\n    return sorted(flat)",
      java: "public class Solution {\n    public List<Integer> mergeKLists(List<List<Integer>> lists) {\n        List<Integer> flat = new ArrayList<>();\n        for (List<Integer> l : lists) flat.addAll(l);\n        Collections.sort(flat);\n        return flat;\n    }\n}",
      cpp: "class Solution {\npublic:\n    std::vector<int> mergeKLists(std::vector<std::vector<int>>& lists) {\n        std::vector<int> flat;\n        for (auto& l : lists) flat.insert(flat.end(), l.begin(), l.end());\n        std::sort(flat.begin(), flat.end());\n        return flat;\n    }\n};"
    },
    testCases: [
      { input: "[[1,4,5],[1,3,4],[2,6]]", expectedOutput: "[1,1,2,3,4,5,6]" }
    ]
  },
  {
    customId: "c18",
    title: "Word Break II",
    difficulty: "Hard",
    prompt: "Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.",
    starter: "function wordBreak(s, wordDict) {\n  // your code here\n}",
    starters: {
      javascript: "function wordBreak(s, wordDict) {\n  const set = new Set(wordDict);\n  const memo = {};\n  function dfs(str) {\n    if (str in memo) return memo[str];\n    if (!str) return [''];\n    const res = [];\n    for (let i = 1; i <= str.length; i++) {\n      const prefix = str.slice(0, i);\n      if (set.has(prefix)) {\n        const suffixes = dfs(str.slice(i));\n        for (const suf of suffixes) {\n          res.push(prefix + (suf ? ' ' + suf : ''));\n        }\n      }\n    }\n    memo[str] = res;\n    return res;\n  }\n  return dfs(s);\n}",
      python: "def word_break(s, wordDict):\n    word_set = set(wordDict)\n    memo = {}\n    def dfs(sub):\n        if sub in memo: return memo[sub]\n        if not sub: return ['']\n        res = []\n        for i in range(1, len(sub) + 1):\n            prefix = sub[:i]\n            if prefix in word_set:\n                suffixes = dfs(sub[i:])\n                for suf in suffixes:\n                    res.append(prefix + (' ' + suf if suf else ''))\n        memo[sub] = res\n        return res\n    return dfs(s)",
      java: "public class Solution {\n    public List<String> wordBreak(String s, List<String> wordDict) {\n        Set<String> set = new HashSet<>(wordDict);\n        Map<String, List<String>> memo = new HashMap<>();\n        return dfs(s, set, memo);\n    }\n}",
      cpp: "class Solution {\npublic:\n    std::vector<std::string> wordBreak(std::string s, std::vector<std::string>& wordDict) {\n        std::unordered_set<std::string> set(wordDict.begin(), wordDict.end());\n        std::unordered_map<std::string, std::vector<std::string>> memo;\n        return dfs(s, set, memo);\n    }\n};"
    },
    testCases: [
      { input: '"catsanddog", ["cat","cats","and","sand","dog"]', expectedOutput: '["cats and dog","cat sand dog"]' }
    ]
  },
  {
    customId: "c19",
    title: "Edit Distance (Levenshtein Distance)",
    difficulty: "Hard",
    prompt: "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2` (operations: insert, delete, replace).",
    starter: "function minDistance(word1, word2) {\n  // your code here\n}",
    starters: {
      javascript: "function minDistance(word1, word2) {\n  const m = word1.length, n = word2.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n      else dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;\n    }\n  }\n  return dp[m][n];\n}",
      python: "def min_distance(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1): dp[i][0] = i\n    for j in range(n + 1): dp[0][j] = j\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if word1[i - 1] == word2[j - 1]: dp[i][j] = dp[i - 1][j - 1]\n            else: dp[i][j] = min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1\n    return dp[m][n]",
      java: "public class Solution {\n    public int minDistance(String word1, String word2) {\n        int m = word1.length(), n = word2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        for (int i = 0; i <= m; i++) dp[i][0] = i;\n        for (int j = 0; j <= n; j++) dp[0][j] = j;\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];\n                else dp[i][j] = Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1])) + 1;\n            }\n        }\n        return dp[m][n];\n    }\n}",
      cpp: "class Solution {\npublic:\n    int minDistance(std::string word1, std::string word2) {\n        int m = word1.length(), n = word2.length();\n        std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));\n        for (int i = 0; i <= m; i++) dp[i][0] = i;\n        for (int j = 0; j <= n; j++) dp[0][j] = j;\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n                else dp[i][j] = std::min({dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]}) + 1;\n            }\n        }\n        return dp[m][n];\n    }\n};"
    },
    testCases: [
      { input: '"horse", "ros"', expectedOutput: "3" }
    ]
  }
];

const STARTER_QUESTIONS = [
  {
    mode: "technical",
    topic: "Data Structures",
    difficulty: "Easy",
    questionText: "What is the difference between an array and a linked list, and when would you choose one over the other?",
    source: "seed"
  },
  {
    mode: "technical",
    topic: "JavaScript",
    difficulty: "Medium",
    questionText: "Explain closures in JavaScript with an example of a practical use case.",
    source: "seed"
  },
  {
    mode: "technical",
    topic: "Databases",
    difficulty: "Medium",
    questionText: "What is the difference between SQL and NoSQL databases? When would you pick MongoDB over MySQL?",
    source: "seed"
  },
  {
    mode: "technical",
    topic: "System Design",
    difficulty: "Hard",
    questionText: "How would you design a URL shortening service like bit.ly? Walk through your approach.",
    source: "seed"
  },
  {
    mode: "technical",
    topic: "React",
    difficulty: "Medium",
    questionText: "What is the Virtual DOM and how does React use it to optimize rendering?",
    source: "seed"
  },
  {
    mode: "hr",
    topic: "Behavioral",
    difficulty: "Easy",
    questionText: "Tell me about yourself and why you're interested in this role.",
    source: "seed"
  },
  {
    mode: "hr",
    topic: "Behavioral",
    difficulty: "Medium",
    questionText: "Describe a time you disagreed with a teammate. How did you handle it?",
    source: "seed"
  },
  {
    mode: "hr",
    topic: "Career",
    difficulty: "Easy",
    questionText: "Where do you see yourself in the next three to five years?",
    source: "seed"
  },
  {
    mode: "hr",
    topic: "Behavioral",
    difficulty: "Medium",
    questionText: "Tell me about a project you're most proud of and the impact it had.",
    source: "seed"
  }
];

export async function seedInitialData() {
  try {
    const existingProblems = await CodingProblem.countDocuments();
    if (existingProblems < CODING_PROBLEMS.length) {
      await CodingProblem.deleteMany({});
      await CodingProblem.insertMany(CODING_PROBLEMS);
      console.log(`Auto-seeded ${CODING_PROBLEMS.length} Coding Problems (Easy, Medium, Hard with multi-language starter code) into MongoDB.`);
    }
    const existingQuestions = await Question.countDocuments();
    if (existingQuestions === 0) {
      await Question.insertMany(STARTER_QUESTIONS);
      console.log("Auto-seeded Questions into MongoDB.");
    }
  } catch (err) {
    console.warn("Auto-seed warning:", err.message);
  }
}

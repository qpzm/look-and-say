package com.example.lookandsay;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

class ListLookAndSay {
    public static void main(String[] args) {
        System.out.println(ant(100));
    }

    public static List<Integer> ant(int n) {
        List<Integer> s = Arrays.asList(1);
        for (int line = 0; line < n; line++) {
            s = next(s);
        }
        return s;
    }

    public static List<Integer> next(List<Integer> ns) {
        return concat(map(g -> Arrays.asList(g.size(), g.get(0)), group(ns)));
    }

    public static <A, B> List<B> map(Function<A, B> f, List<A> as) {
        List<B> bs = new ArrayList<>();
        for (A a : as) {
            bs.add(f.apply(a));
        }

        return bs;
    }

    public static <A> List<A> concat(List<List<A>> ass) {
        List<A> result = new ArrayList<>();
        for (List<A> as : ass) {
            for (A a : as) {
                result.add(a);
            }
        }

        return result;
    }

    public static <A> List<List<A>> group(List<A> as) {
        List<List<A>> ass = new ArrayList<>();
        List<A> g = null;
        for (A a : as) {
            if (g == null || !g.get(0).equals(a)) {
                g = new ArrayList<>();
                ass.add(g);
            }
            g.add(a);
        }

        return ass;
    }
}
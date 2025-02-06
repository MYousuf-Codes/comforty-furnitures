"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/container"; // Corrected import

const OrderStatusPage: React.FC = () => {
  return (
    <Container className="flex h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
      >
        <Card className="text-center shadow-lg">
          <CardContent className="p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-semibold sm:text-3xl">Coming Soon!</h2>
            <p className="mt-2 text-sm sm:text-base">
              The feature will be added soon. Stay tuned for updates.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default OrderStatusPage;
